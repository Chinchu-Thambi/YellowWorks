*** Settings ***
Documentation     Buy online journey for Yellow Products keywords
Resource          ../helper.robot
Resource          ../common_steps.robot
Resource          ../registration_login/registration_keywords.robot
Resource          ../registration_login/login_keywords.robot
Resource          ../registration_login/forgot_password_keywords.robot
Resource          hubspot_keywords.robot
Library           ../util.py
Library           ../config.py
Variables         ../site_data.py
Variables         products_sitedata_sbj.py
Variables         ../registration_login/login_sitedata.py
Variables         ../registration_login/registration_sitedata.py
Variables         ../registration_login/forgot_password_sitedata.py

*** Keywords ***
User selects Choose Yellow Profile from the Products
   Go To Url And Wait For Element    ${TEST_URL}${yellow_profile_link}     ${select_base_profile}

Selected Base Profile
    Set Focus To Element       ${select_base_profile}
    Click Element If It Exists      ${select_base_profile}

Select Premium Profile
    Set Focus To Element        ${select_paid_profile}
    Click Element If It Exists      ${select_paid_profile}

User perform Continue Shopping
    Click Element If It Exists     ${continue_shopping}
    Sleep   2s
    User selects Choose Yellow Profile from the Products

User Sign In
    Sleep  2s
    User log in using Registered Customer credentials

User access sign up screen
    User on signup after checkout

Click Purchase
    Click element    ${purchase_button}  ## to be updated with PURCHASE obj identification

Add Business details
    Verify page element text:      ${checkout_page_header}     Secure checkout
    ${random_company_id}    Generate Random String  10   [NUMBERS]
    Set Global Variable     ${BUSINESS_NAME}        Test NW Yellow Business ${random_company_id}
    Sleep         1s
    Input text              ${company_name}         ${BUSINESS_NAME}
    Select From List By Value       ${Area_code}            22
    Input text              ${Phone_number}         3602595
    Input text               ${Search_for_your_address}     608 Great South Road Ellerslie,Auckland,New Zealand
    Sleep        2s
    Press keys               ${Search_for_your_address}     ARROW_DOWN+RETURN
    Sleep        1s

Add Payment details
    Select frame     ${payment_detail_frame_area}
    Input text       ${card_number}        4111111111111111
    Unselect frame
    Select frame     ${payment_expiry_date_frame}
    Input text       ${expiry_date}        02/22
    Unselect frame
    Select frame     ${payment_cvc_frame}
    Input text       ${cvc_number}         245
    Unselect frame
    Input text       ${cardholder_name}    Kane Williamson
    Set the credit card variables

Set the variables test
    ${temp_business_name}   Get Text      xpath=//*[@id='gatsby-focus-wrapper']/section/div/div/div[1]/section/form/div[1]/div[1]/p
    Set Global Variable     ${BUSINESS_NAME}       ${temp_business_name}
    Set the credit card variables

Set the credit card variables
    Set Global Variable     ${CC_LAST_DOGITS}      1111
    Set Global Variable     ${EXPIRY_DAY}         2
    Set Global Variable     ${EXPIRY_YEAR}        2022
    Set Global Variable     ${VISA_CARD_HOLDER}   Kane Williamson

Cart summary should be accurate for "${profile}" with "${amount}" price in row "${row}" in the cart
    Verify page element text:     xpath=//*[@id="gatsby-focus-wrapper"]/section/div/section/div/table/tbody/tr[${row}]/td[2]/h5     ${profile}
    Verify page element text:     xpath=//*[@id="gatsby-focus-wrapper"]/section/div/section/div/table/tbody/tr[${row}]/td[3]/strong   ${amount}
    ${st_date} =  Get_todays_date
    ${end_date} =   Get_last_date_of_the_month
    ${days_left} =  Get_date_difference   ${st_date}   ${end_date}
    ${total_days}=   Get_number_of_days_in_month  ${st_date}
    ${pro_rat_amt}=   Get_pro_rata_amount   ${amount}   ${days_left}    ${total_days}
    Set Global Variable   ${pro_rat_amt}
    Set Global Variable   ${amount}
    Set Global Variable  ${total_pro_amt}   ${pro_rat_amt}
    Set Global Variable  ${total_actual_amt}   ${amount}
    Compute pro rata total amount
    Compute actual total amount

Cart summary should be accurate for "${category}" Sponsorship with "${price}" price in row "${row}" in the cart
    Verify page element text:    xpath=//*[@id="gatsby-focus-wrapper"]/section/div/section/div/table/tbody/tr[${row}]/td[2]/h5   ${category}
    Verify page element text:    xpath=//*[@id="gatsby-focus-wrapper"]/section/div/section/div/table/tbody/tr[${row}]/td[3]/strong   ${price}
    ${st_date} =  Get_todays_date
    ${end_date} =   Get_last_date_of_the_month
    ${days_left} =  Get_date_difference   ${st_date}   ${end_date}
    ${total_days}=   Get_number_of_days_in_month  ${st_date}
    ${pro_rat_temp_amt}=   Get_pro_rata_amount   ${price}   ${days_left}    ${total_days}
    Set Global Variable   ${pro_rat_temp_amt}
    Set Global Variable   ${price}
    ${total_pro_amt}=   Evaluate   ${pro_rat_amt} + ${pro_rat_temp_amt}
    ${total_actual_amt}=   Evaluate   ${amount} + ${price}
    Set Global Variable  ${total_pro_amt}
    Set Global Variable  ${total_actual_amt}
    Compute pro rata total amount
    Compute actual total amount

Verify the pro rata amounts are not empty when 1 profile and 0 categories
    Wait Until Page Contains Element    ${first_period_billed_base_profile}
    Sleep   1s
    Element Text Should Not Be Empty    ${first_period_billed_base_profile}
    Element Text Should Not Be Empty    ${first_period_billed_subtotal}
    Element Text Should Not Be Empty    ${first_period_total}
    Element Text Should Not Be Empty    ${first_period_billed_header}
    ${temp_pro_rata_amont}=     Get Text     ${first_period_billed_subtotal}
    ${remove_$_pro_rata_amont}    Remove String    ${temp_pro_rata_amont}    ,    $
    Set Global variable     ${PRO_RATA_AMOUNT_CURR}          ${remove_$_pro_rata_amont}

Verify the pro rata amounts are not empty when 1 profile and 1 category
    Wait Until Page Contains Element     ${first_period_billed_base_profile}
    Sleep   1s
    Element Text Should Not Be Empty     ${first_period_billed_base_profile}
#    Element Text Should Not Be Empty     ${first_period_first_category_boost}
    Element Text Should Not Be Empty     ${first_category_profile_subtotal}
    Element Text Should Not Be Empty     ${first_category_profile_gst}
#    Element Text Should Not Be Empty     ${first_period_billed_header}
    Element Text Should Not Be Empty     ${first_period_billed_header_category}
    ${temp_pro_rata_amont}=     Get Text     ${first_period_total}
    ${remove_$_pro_rata_amont}    Remove String    ${temp_pro_rata_amont}    ,    $
    Set Global variable     ${PRO_RATA_AMOUNT_CURR}          ${remove_$_pro_rata_amont}

Compute pro rata total amount
    Sleep   3s
    ${prorata_total}=   Calculate_pro_rata_total_amount   ${total_pro_amt}
    Set Suite Variable  ${prorata_total}

Compute actual total amount
    Sleep   3s
    ${actual_amount_total} =  Calculate_actual_total_amount  ${total_actual_amt}
    Set Suite Variable   ${actual_amount_total}

Calculate Pro rata plus GST
    ${total_1st_period}=   Get_total_amount    ${prorata_total}   .15
    Verify page element text:      ${first_period_billed_header}       ${total_1st_period}

Verify the Actual Calculated amount plus GST
    ${total_monthly_ongoing}=  get_total_amount    ${actual_amount_total}   .15
    Verify page element text:      ${Total_for_Monthly_ongoing}    ${total_monthly_ongoing}

Click on Confirm Order
    Sleep   3s
    Click element and wait for another element    ${submit_order_button}     ${set_up_my_products_button}

Select Gold Category Sponsorship
    Click Element If It Exists      ${category_sponsership_gold}

Select Silver Category Sponsorship
    Click Element If It Exists     ${category_sponsorship_silver}

Select Bronze Category Sponsorship
    Click Element If It Exists     ${category_sponsership_bronze }

Business details captured in HubSpot Company
    User log in to Hubspot
    Business details captured in Hubspot

Login to Hubspot
    User log in to Hubspot

User enters an invalid verification code
    Input text                      ${signup_navi_activationcode_text}  123456
    Click Element If It Exists      ${signup_navi_activateaccount_button}

User automatically signed in successfully on checkout page
    Click Element If It Exists              ${signup_navi_activation_success_continue}
    Wait Until Page Contains Element        ${checkout_page_header}

User able to sign up
    User on signup after checkout
    User signs up using a generic email address and valid user information
    User redirects to the activation panel
    User receives an email notification for user registration
    User successfully activate the account with a valid activation code
    User continues to checkout page

User navigates to order confirmation page
    Verify page element text:    ${order_confirmation}     YOUR ORDER HAS BEEN PLACED
    ${order_comfirmation_id}    Get Text    ${confirmation_page_order_conformation_id_label}
    Set Global Variable         ${order_comfirmation_id}

Cart and Company Details section should be available
    Verify the cart summary title
    Verify the company details title

Cart, Company and Payment Details section should be available
    Verify the cart summary title
    Verify the company details title
    Verify the coupon details title
    Verify the payment details title

Verify the cart summary title
    Wait Until Page Contains Element        ${cart_summary_title_label}
    Verify page element text:    ${cart_summary_title_label}     Purchase summary

Verify the company details title
     Verify page element text:   ${company_details_title_label}      Business details

Get already register user details
     ${temp_business_name}    Get Text      ${auto_populated_business_name}
     Set Global Variable     ${BUSINESS_NAME}       ${temp_business_name}
     Set Global Variable   ${CC_LAST_DOGITS}      4242
     Set Global Variable    ${EXPIRY_DAY}         12
     Set Global Variable    ${EXPIRY_YEAR}        2031
     Set Global Variable    ${VISA_CARD_HOLDER}   Kumindu Dias

Verify the payment details title
    Sleep   2s
    Verify page element text:   ${payment_details_title_label}      Payment details

Verify the coupon details title
    Sleep   4s
    Verify page element text:   ${coupon_details_title_label}      Discount Code

Select terms of business and card authorization
    Set Focus To Element            ${order_terms_of_business_checkbox}
    Click Element If It Exists      ${order_terms_of_business_checkbox}
    Click Element If It Exists      ${order_payments_checkbox}

Select terms of business authorization
    Set Focus To Element            ${order_terms_of_business_checkbox}
    Click Element If It Exists      ${order_terms_of_business_checkbox}

User navigates to the Products
    Click element and wait for another element      ${our_products_yellow_online_profile_link}      ${choose_yellow_profile}

User receives an Order Confirmation email
    Read Gmail order confirmation email content

Read Gmail order confirmation email content
    [Timeout]      240s
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    Open Gmail homepage by a new browser for order comfirmation email
    Input text    ${gmail_email_id_text}    ${gmail_static_email_address}
    Click element and wait for another element      ${gmail_email_next_button}      ${gmail_password_text}
    Input text    ${gmail_password_text}    ${gmail_static_password}
    Click Element If It Exists      ${gmail_password_next_button}
    Wait Until Page Contains Element        ${gmail_search_email_primary_text}
    Click Element If It Exists      ${gmail_promotion_tab}
    Sleep   3s
    ${element_present}=     Run Keyword And Return Status       Element Should Be Visible       ${gmail_automation_1st_order_confirmaiton_email}
    Run Keyword If      ${element_present}     Click Element        ${gmail_automation_1st_order_confirmaiton_email}
    Sleep   3s
    Page Should Contain      ${order_comfirmation_id}

Open Gmail homepage by a new browser for order comfirmation email
    [Timeout]    120s
    Run Keyword If      '${command_executor}' == 'None'     Open Browser    ${gmail_url}    browser=${browser}
    Run Keyword Unless  '${command_executor}' == 'None'     Open Browser    ${gmail_url}    browser=${browser}     remote_url=${command_executor}    desired_capabilities=${desired_capabilities}
    Wait For Page To Load
    Maximize Browser Window

Payment details section should not be available
    Page Should Not Contain Element     ${card_number}
    Page Should Not Contain Element     ${expiry_date}
    Page Should Not Contain Element     ${cvc_number}
    Page Should Not Contain Element     ${cardholder_name}

User can proceed to checkout page
    Page Should Contain Element     ${checkout_on_cart}

User removes product from the cart
    Click Element If It Exists      ${cart_product_remove_button}

User is not supposed to proceed to checkout page
    Wait Until Page Does Not Contain Element        ${cart_product_remove_button}
    Page Should Not Contain Element                 ${checkout_on_cart}
    Page Should Not Contain                         ${continue_button}

User add new product to the cart and confirmm order
    User navigates to the Products
    Selected Base Profile
    Select Silver Category Sponsorship
    Perform Add to Cart
    User navigates to Shopping Cart page
    Click on Check Out
    User Sign In
    Add Business details
    Add Payment details
    Select terms of business and card authorization
    Click on Confirm Order

User perform forgot password while buying products
    User clicks on forgot password while buying products
    User provides the registered generic email address
    User clicks send code
    User navigates to reset password screen
    User receives an email notification for forgot password
    User successfully confirm the new password
    User clicks Continue

User clicks on forgot password while buying products
    Click element and wait for another element    ${signin_navi_panel_forgotpassword_link}    ${forgot_navi_panel_back_to_sign_in_button}

User has created and activated a new account before buying
    User is in home page and access sign up before buying
    User signs up using a generic email address and valid user information
    User redirects to the activation panel
    User receives an email notification for user registration
    User successfully activate the account with a valid activation code
    User gets the activation success message
    User automatically signed in successfully
    User should be able to sign out successfully

User is in home page and access sign up before buying
    User access sign up before buying

User access sign up before buying
    Go To Url And Wait For Element    ${TEST_URL}    ${signin_navi_panel}
    Click element and wait for another element    ${signin_navi_panel}    ${signin_navi_login_button}
    Click element and wait for another element    ${signin_navi_createaccount_link}    ${signup_navi_createaccount_button}

User sign in with new password successfully
    Input email address after reset password
    Input new password after reset password
    Click login with new credentials
    User automatically signed in successfully

User continues to checkout page
    Click element and wait for another element     ${continue_button}    ${signin_navi_panel_signedin}

User access the cart and checkout from the home page
    Click element and wait for another element     ${home_page_cart_icon}    ${checkout_on_cart}
    Click element and wait for another element     ${checkout_on_cart}      ${checkout_page_header}

Remove Profile with Category Sponsorship in row "${row}" in the cart
    Click element and wait for another element    xpath=//*[@id="gatsby-focus-wrapper"]/section/div[${row}]/div[1]/button   ${checkout_on_cart}

User clicks on proceed with purchase
    Sleep     2s
    Click element and wait for another element     ${proceed_with_purchase}     ${cart_summary_title_label}

User clicks Continue
    Click Element And Wait For Another Element     ${forgot_pwd_continue_button}     ${cart_summary_title_label}

Add to the cart button disabled
    Element Should Be Disabled       ${purchase_button}
