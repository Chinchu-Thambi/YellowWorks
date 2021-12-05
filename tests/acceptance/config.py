import sys
import os
from time import sleep
import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

# Wait for nodes to be registered
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

ROBOT_BROWSER_TIMEOUT = 120
TIMEOUT = "240s"
POLLTIME = "2s"


def check_browser(url):
    elapsed_time = 0
    while elapsed_time != ROBOT_BROWSER_TIMEOUT:
        try:
            driver = webdriver.Remote(
                command_executor=url,
                desired_capabilities=getattr(DesiredCapabilities, 'CHROME')
            )
            driver.quit()
            break
        except:
            sleep(1)
            elapsed_time += 1


TEST_URL                    = os.getenv('PROJECT_URL')
STRIPE_URL                  = os.getenv('STRIPE_URL')
BROWSER                     = os.getenv('BROWSER')
COMMAND_EXECUTOR            = os.getenv('REMOTE_URL')
AXLE_URL                    = os.getenv('AXLE_URL')
DESIRED_CAPABILITIES        = {'browserName': BROWSER}


if BROWSER == 'chrome':
    DESIRED_CAPABILITIES = {'build': 'NW-Chrome-Demo-Aug1', 'browserName': 'Chrome', 'version': '75.0',
                            'platform': 'Windows 10', 'resolution': '1920x1080', 'tunnel': True}
    # DESIRED_CAPABILITIES = {'browserName': 'chrome'}
elif BROWSER == 'ie':
    DESIRED_CAPABILITIES = {'build': 'NW-IE-Demo', 'browserName': 'Internet Explorer', 'version': '11.0',
                            'platform': 'Windows 10', 'resolution': '1920x1080', 'ie.compatibility': 11001,
                            'tunnel': True}
elif BROWSER == 'edge':
    DESIRED_CAPABILITIES = {'build': 'NW-Edge-Demo', 'browserName': 'MicrosoftEdge', 'version': '18.0',
                            'platform': 'Windows 10', 'resolution': '1920x1080', 'tunnel': True}
elif BROWSER == 'safari':
    DESIRED_CAPABILITIES = {'build': 'NW-Safari-Demo', 'browserName': 'Safari', 'version': '11.0',
                            'platform': 'macOS High Sierra', 'resolution': '1920x1080', 'tunnel': True}

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

test_session = {
    'role': 'business owner',  # Default user is registered user
    'username': None,
    'password': None,
    'login_method': 'NAVIGATION'  # Default login is through navigation panel
}
