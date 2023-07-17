from celery import shared_task
from django.contrib.auth import get_user_model
from .models import Notification, Ingredient, MenuItemSold
from datetime import date, datetime, timedelta
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@shared_task
def add(x, y):
    # Celery recognizes this as the `movies.tasks.add` task
    # the name is purposefully omitted here.
    return x + y

@shared_task
def check_expiry():
    for user in get_user_model().objects.filter(is_superuser=False):
        noticePeriod = user.userprofile.noticePeriod
        Ingredients = Ingredient.objects.filter(user = user)
        for ingredient in Ingredients:
            if ingredient.expirationDate < date.today():
                if not Notification.objects.filter(user = user, subject= "Expired", message = ingredient.name + " has expired.", date = date.today()).exists():
                    notification = Notification.objects.create(user = user, subject= "Expired", message = ingredient.name + " has expired.", date = date.today())
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        "notifications_" + str(user.id),
                        {
                            "type": "send_notification",
                            "message": "New notification"
                        }
                    )

            elif ingredient.expirationDate < date.today() + timedelta(days=noticePeriod):
                if not Notification.objects.filter(user = user, subject= "Expiring Soon", message = ingredient.name + " is expiring soon.", date = date.today()).exists():
                    notification = Notification.objects.create(user = user, subject= "Expiring Soon", message = ingredient.name + " is expiring soon.", date = date.today())
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        "notifications_" + str(user.id),
                        {
                            "type": "send_notification",
                            "message": "New notification"
                        }
                    )
    return "Expiry checked!"

@shared_task
def log_menuItemSold():
    for user in get_user_model().objects.all():
        menuItems = user.menuitem_set.all()
        for menuItem in menuItems:
            if menuItem.menuitemsold_set.all().exists():
                prevMenuItemSold = menuItem.menuitemsold_set.all().latest('date')
                if prevMenuItemSold.date != date.today():
                    MenuItemSold.objects.create(menuItem = menuItem, currentTotalSold = menuItem.totalSold ,quantity = menuItem.totalSold - prevMenuItemSold.currentTotalSold, date = date.today())
            else:
                MenuItemSold.objects.create(menuItem = menuItem, currentTotalSold = menuItem.totalSold ,quantity = menuItem.totalSold, date = date.today())
        
    return "MenuItemSold logged!"

@shared_task
def calibrate_ingredient():
    for user in get_user_model().objects.all():
        ingredients = user.ingredient_set.all()
        for ingredient in ingredients:
            quantity = 0
            menuIngredients = ingredient.menuingredient_set.all()
            for menuIngredient in menuIngredients:
                averageSold = 0
                sold = menuIngredient.menuItem.menuitemsold_set.all().order_by('-date')[:7]
                for menuItemSold in sold:
                    averageSold += menuItemSold.quantity
                
                averageSold = averageSold / sold.count()
                quantity += averageSold * menuIngredient.quantity

            ingredient.calibratedMin = quantity
            ingredient.save()
            # print(ingredient.name + " calibratedMin: " + str(quantity))
    
    return "Calibrated!"

@shared_task
def test():
    user = get_user_model().objects.get(id=40)
    menuItems = user.menuitem_set.all()[:10]
    
    return menuItems.count()