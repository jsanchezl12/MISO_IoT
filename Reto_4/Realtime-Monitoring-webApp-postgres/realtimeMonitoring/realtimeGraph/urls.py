from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import *

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('historical/', HistoricalView.as_view(), name='historical'),
    path('rema/', RemaView.as_view(), name='rema'),
    path('rema/<str:measure>', RemaView.as_view(), name='rema'),
    path("mapJson/", get_map_json, name="mapJson"),
    path("mapJson/<str:measure>", get_map_json, name="mapJson"),
    path("mapJsonReto/", get_map_json_reto, name="mapJsonReto"),
    path("mapJsonReto/<str:role>", get_map_json_reto, name="mapJsonReto"),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('historical/data', download_csv_data, name='historical-data'),
    path('reto/', RetoDataView.as_view(), name='reto'),
]
