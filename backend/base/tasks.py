from celery import shared_task
from django.contrib.auth import get_user_model
from .models import Notification, Ingredient
from datetime import date, datetime, timedelta
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@shared_task
def add(x, y):
    # Celery recognizes this as the `movies.tasks.add` task
    # the name is purposefully omitted here.
    return x + y

@shared_task
def create_notification():
    for user in get_user_model().objects.all():
        Ingredients = Ingredient.objects.filter(user = user)
        for ingredient in Ingredients:
            if ingredient.expirationDate < date.today() + timedelta(days=5):
                if not Notification.objects.filter(user = user, subject= "Expiring Soon", message = ingredient.name + " is expiring soon.", date = date.today()).exists():
                    notification = Notification.objects.create(user = user, subject= "Expiring Soon", message = ingredient.name + " is expiring soon.", date = date.today())
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        "notifications_40" ,
                        {
                            "type": "send_notification",
                            "message": "New notification"
                        }
                    )
    return "Notification created!"
