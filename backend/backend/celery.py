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
    'create-notification': {
        'task': 'base.tasks.create_notification',
        'schedule': crontab(minute=0, hour="*/1"), #every hour
        'args': ()
    }
}