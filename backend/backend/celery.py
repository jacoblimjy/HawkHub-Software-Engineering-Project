import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    # 'add-every-10-seconds': {
    #     'task': 'base.tasks.add',
    #     'schedule': 10.0,
    #     'args': (7,8)
    # },
    'check-expiry': {
        'task': 'base.tasks.check_expiry',
        'schedule': crontab(minute=0, hour=0), #every day at 12am
        'args': ()
    },

    'log-menuItemSold': {
        'task': 'base.tasks.log_menuItemSold',
        'schedule': crontab(minute=59, hour=11), #every day at 11:59am
        'args': ()
    },

    'calibrate-ingredient': {
        'task': 'base.tasks.calibrate_ingredient',
        'schedule': crontab(minute=0, hour=0), #every day at 12am
        'args': ()
    },
}