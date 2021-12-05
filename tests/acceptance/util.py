import json
import uuid
from datetime import datetime
from datetime import timedelta
from robot.libraries.BuiltIn import BuiltIn
from PIL import Image, ImageChops
from robot.api import logger
import os
import math
import calendar
import stripe
import base64


total_actual_amt_sum=0
actual_amount_round=0
pro_rat_amt_cal=0
amt_cal=0
path = os.getenv('outputdir')
project_url = os.getenv('PROJECT_URL')
stripe_api_key = os.getenv('STRIPE_API_KEY')

def get_webdriver_instance():
    se2lib = BuiltIn().get_library_instance('SeleniumLibrary')
    return se2lib._current_browser()


def capture_element_screenshot(locator, filename):
    try:
        driver = get_webdriver_instance()
        logger.info("Get driver instance")
        logger.info(driver)
        logger.info(filename)
        driver.save_screenshot(filename)
        logger.info("Save screenshot")
        im = Image.open(filename)  # uses PIL library to open image in memory
        logger.info("Image opened")
        element = driver.find_element_by_css_selector(locator[4:])
        logger.info("Find element")
        location = element.location
        size = element.size
        left = location['x']
        top = location['y']
        right = location['x'] + size['width']
        bottom = location['y'] + size['height']
        im = im.crop((left, top, right, bottom))  # defines crop points
        logger.info("Define crop points")
        im.save(filename)  # saves new cropped image
        logger.info("Image saved")
    except:
        raise RuntimeError("Failed to capture image")


def resize_snapshot():
    # print "value of path is:"
    # print path
    for item in os.listdir(path):
        if item.startswith('selenium-screenshot') and os.stat(path + '/' + item).st_size > 100:
            try:
                im = Image.open(path + '/' + item)
                f, e = os.path.splitext(path + '/' + item)
                imResize = im.resize((640, 400), Image.ANTIALIAS)
                imResize.save(f + '.png', 'PNG', quality=100)
            except:
                print("exception happened when processing for:" + item)


def date_isvalid(date_enter):
    try:
        valid_date_format = datetime.strptime(date_enter, '%d %B %Y')
        print('valid date!', valid_date_format)
        return True
    except ValueError:
        return False


def get_test_environment_name_from_project_URL(url):
    if '.dev.' in url:
        env = 'Dev'
    elif '.qa.' in url:
        env = 'QA'
    elif '.staging.' in url:
        env = 'Staging'
    elif 'https://yellow.co.nz' in url:
        env = 'Production'
    return env


def generate_uuid():
    uid = uuid.uuid4().urn
    return uid[11:]


def print_date(date_string):
    date_object = datetime.strptime(date_string, '%d %b %Y')
    return date_object.strftime('%d/%m/%Y')


def generate_date():
    current_date = datetime.now()
    return current_date.strftime('%a %b %d %Y')


def get_customer_card_info(email):
    stripe.api_key = stripe_api_key
    results = stripe.Customer.list(email=email)
    customer = results.data[0]
    customer_id = customer.id
    response = stripe.PaymentMethod.list(customer=customer_id, type="card")
    customer_name = response.data[0].billing_details.name
    exp_month = response.data[0].card.exp_month
    exp_year = response.data[0].card.exp_year
    last_digits = response.data[0].card.last4
    return [customer_name, last_digits, exp_month, exp_year]


def get_total_amount(subtotal, gst):
    subtotal = float(subtotal)
    gst = float(gst)
    total_amount = subtotal * gst
    actual_amount = subtotal + total_amount
    actual_amount_round= str(round(actual_amount, 2))
    return (actual_amount_round)

def check_complete_browser_log():
    driver_log = get_webdriver_instance()
    return [entry for entry in driver_log.get_log('browser')]

def get_date_difference(start_date, end_date):
    print(start_date)
    date_format = "%d/%m/%Y"
    formated_start_date = datetime.strptime(start_date, date_format)
    formated_end_date = datetime.strptime(end_date, date_format)
    Number_of_days_left = formated_end_date - formated_start_date
    return (Number_of_days_left.days)

def get_pro_rata_amount(product_amount, remain_days_left, total_no_days_in_month):
    product_amount  = int(product_amount)
    total_no_days_in_month =  int(total_no_days_in_month)
    remain_days_left   =  int(remain_days_left)
    prorata_amount = float(remain_days_left)/total_no_days_in_month
    prorata_amount_final = float (prorata_amount * product_amount)
    roundoff_prorata_amount= float(round(prorata_amount_final, 2))
    rundoff_amt = str(roundoff_prorata_amount)
    return (rundoff_amt)

def get_number_of_days_in_month(start_date):
    date_format = "%d/%m/%Y"
    date_dd_mm_yy = datetime.strptime(start_date, date_format)
    date_month= date_dd_mm_yy.month
    date_year= date_dd_mm_yy.year
    days_in_month= calendar.monthrange(date_year,date_month)[1]
    return(days_in_month)

def calculate_pro_rata_total_amount(pro_rat_amt_cal):
    pro_rat_amt_cal= float(pro_rat_amt_cal)
    total_pro_rata_sum = 0
    total_pro_rata_sum = total_pro_rata_sum + pro_rat_amt_cal
    return(total_pro_rata_sum)

def calculate_actual_total_amount(amt_cal):
    amt_cal= float(amt_cal)
    total_actual_amt_sum = 0
    total_actual_amt_sum = total_actual_amt_sum + amt_cal
    return(total_actual_amt_sum)

def get_todays_date():
    start_date = datetime.today()
    date_format = "%d/%m/%Y"
    format_start_dt = start_date.strftime(date_format)
    print(format_start_dt)
    return(format_start_dt)

def get_todays_date_plus1_calendar_day():
    date_1 = datetime.today()
    date_format = "%#d/%#m/%Y"
    end_date = date_1 + timedelta(days=1)
    format_end_date = end_date.strftime(date_format)
    print(format_end_date)
    return(format_end_date)

def get_last_date_of_the_month():
    current_date = datetime.now()
    current_yr = current_date.strftime("%Y")
    print(current_yr)
    current_month = current_date.strftime("%m")
    print(current_month)
    _, num_days = calendar.monthrange(int(current_yr), int(current_month))
    print(num_days)
    last_day = datetime(int(current_yr), int(current_month), int(num_days))
    print(last_day.strftime('%d/%m/%Y'))
    return(last_day.strftime('%d/%m/%Y'))

def first_day_of_next_month():
    try:
        now = datetime.now()
        next_month_date = datetime(now.year, now.month + 1,1)
    except ValueError:
        next_month_date = datetime(now.year+1,1,1)
    print(next_month_date)
    print(next_month_date.strftime('%#d/%#m/%Y'))
    return (next_month_date.strftime('%#d/%#m/%Y'))

def decode_string(s):
    return base64.b64decode(s)


def read_username(role):
    return get_secret_data(role, 'email')


def read_password(role):
    return get_secret_data(role, 'password')


def read_full_name(role):
    return get_secret_data(role, 'fullname')


def get_secret_data(role, key):
    with open(os.path.dirname(os.path.realpath(__file__)) + '/credentials.json') as secrets:
        data = json.load(secrets)
    return decode_string(data[role][key])


def click_browser_back_button():
    driver = get_webdriver_instance()
    driver.execute_script("window.history.go(-1)")

