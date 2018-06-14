angular.module('config', [])
.constant('config', {
    'weatherRefreshInterval': 300000, // ms
    'serviceEndpoint': 'https://new-tab-service.alexazhu.com/'
});