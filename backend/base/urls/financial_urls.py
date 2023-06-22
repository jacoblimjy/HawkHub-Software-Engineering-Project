from base.views import financial_views as views
from django.urls import path

urlpatterns = [
    path('getFinancials/', views.getFinancials, name='get-financials'),
    path('updateFinancial/', views.updateFinancial, name='update-financial'),
]