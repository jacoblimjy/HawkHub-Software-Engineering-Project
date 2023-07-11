import json
from channels.generic.websocket import WebsocketConsumer
from base.models import Ingredient
from base.serializers import IngredientSerializer, UserSerializer
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from base.models import Notification
from base.serializers import NotificationSerializer

class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'notifications_' + str(self.scope["user_id"])
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        user = get_user_model().objects.get(id=self.scope["user_id"])
        notifications = user.notification_set.all().order_by('-_id')
        notifications_unread = notifications.filter(isRead=False)
        serializer_all = NotificationSerializer(notifications, many=True)
        serializer_unread = NotificationSerializer(notifications_unread, many=True)
        self.accept()
        self.send(text_data=json.dumps({
            'type': "notification",
            'notification_all': serializer_all.data,
            'notification_unread': serializer_unread.data
        }))
    
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)
    
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        notification = Notification.objects.get(_id=text_data_json['id'])
        if text_data_json['type'] == "read":
            notification.isRead = True
            notification.save()
        elif text_data_json['type'] == "delete":
            notification.delete()
        notifications = Notification.objects.filter(user=self.scope["user_id"]).order_by('-_id')
        notifications_unread = notifications.filter(isRead=False)
        serializer_all = NotificationSerializer(notifications, many=True)
        serializer_unread = NotificationSerializer(notifications_unread, many=True)
        self.send(text_data=json.dumps({
            'type': "notification",
            'notification_all': serializer_all.data,
            'notification_unread': serializer_unread.data
        }))
        # data = Ingredient.objects.all()
        # # serializer = IngredientSerializer(data, many=True)
        
        # user = get_user_model().objects.get(id=self.scope["user_id"])
        # serializer = UserSerializer(user)

        # self.send(text_data=json.dumps({
        #     'data': serializer.data
        # }))

    def send_notification(self, event):
        message = event['message']
        user = get_user_model().objects.get(id=self.scope["user_id"])
        notifications = user.notification_set.all().order_by('-_id')
        notifications_unread = notifications.filter(isRead=False)
        serializer_all = NotificationSerializer(notifications, many=True)
        serializer_unread = NotificationSerializer(notifications_unread, many=True)
        self.send(text_data=json.dumps({
            'type': "notification",
            'notification_all': serializer_all.data,
            'notification_unread': serializer_unread.data
        }))
    
