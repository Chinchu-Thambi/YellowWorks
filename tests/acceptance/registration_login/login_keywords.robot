*** Settings ***
Documentation     Customer Login Flow Related Keywords
Resource          ../helper.robot
Resource          ../common_steps.robot
Library           ../util.py
Library           ../config.py
Variables         login_sitedata.py
Variables         registration_sitedata.py

*** Keywords ***
User is on the home page
    Go To Url And Wait For Element    ${TEST_URL}    ${signin_navi_panel}

User brings up the navigation panel
    Open navigation login panel

User logs in using valid email address and password
    User log in using Registered Customer credentials

User trying to login with an unregistered email and password
    User log in using Unregistered Customer credentials

Login should not be successful
    Element should not be visible  ${signin_navi_panel_signedin}

User can see the error message on login screen "${error_message}"
    Notification displayed:     ${error_message}

User clicks the Back button
    Sleep  3s
    Click browser back button
    Wait Until Element Is Visible    ${signin_navi_panel_signedin}

User is not signout
    Element should not be visible  ${signin_navi_panel}

Login should be successful
    Wait Until Element Is Visible     ${welcome_modal_close_icon}
    Click Element     ${welcome_modal_close_icon}
    Element should be visible   ${signin_navi_panel_signedin}

#Login should be successful for Staff
#    Login should be successful
#    Wait Until Element Is Visible    ${staff_login_customer_email_inputtext}
#    Element should be visible       ${staff_login_customer_confirm_button}

User should be able to log out succesfully
    Signed In dropdown content should be accurate
    User signed out

User signed out
    Sleep   2s
    Click Element And Wait For Another Element      ${signedin_dropdown_signout_option}     ${signin_navi_panel}

Signed In dropdown content should be accurate
    Click element and wait for another element      ${signin_navi_panel_signedin}    ${signedin_dropdown_signout_option}
    Sleep   2s
    Element should be visible  ${signedin_dropdown_account_settings_option}
    Element should be visible  ${signedin_dropdown_insights_option}

Open navigation login panel
    Click element and wait for another element    ${signin_navi_panel}    ${signin_navi_login_button}
    Set Login Method "NAVIGATION"

User log in using Registered Customer credentials
    Set User    registered user
    Login Registered user

User log in using Unregistered Customer credentials
    Set User    unregistered user
    Login Unregistered user

User log in using Facebook credentials
    Set User    facebook user
    Login Facebook user

User log in using Google credentials
    Set User    google user
    Login Google user

User log in using Yellow staff credentials
    Set User    yellow staff
    Login Yellow user

Set Login Method "${login_method}"
    Set to Dictionary  ${test_session}  login_method=${login_method}

User log in using Registered searchads Customer credentials
    Set User    searchads_user
    Login searchads user

Login searchads user
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${full_name}    Get Full Name
    ${full_name_str}     Convert To String   ${full_name}
    Set global variable    ${REGISTERED_USER_NAME}       ${full_name_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${signin_business_email_text}      ${username_str}
    Enter password      ${signin_business_password_text}      ${password_str}
    Sleep  1s
    Click element and wait for another element    ${signin_navi_login_button}       ${signin_navi_panel_signedin}

Login Registered user
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${full_name}    Get Full Name
    ${full_name_str}     Convert To String   ${full_name}
    Set global variable    ${REGISTERED_USER_NAME}       ${full_name_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${signin_business_email_text}      ${username_str}
    Enter password      ${signin_business_password_text}      ${password_str}
    Sleep  1s
    Click element and wait for another element    ${signin_navi_login_button}       ${signin_navi_panel_signedin}

Login Unregistered user
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${full_name}    Get Full Name
    ${full_name_str}     Convert To String   ${full_name}
    Set global variable    ${REGISTERED_USER_NAME}       ${full_name_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${signin_business_email_text}      ${username_str}
    Enter password      ${signin_business_password_text}      ${password_str}
    Sleep  1s
    Click Element If It Exists      ${signin_navi_login_button}

Login Facebook user
    Sleep  2s
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    Set Global Variable     ${CUSTOMER_EMAIL}   ${username_str}
    ${full_name}    Get Full Name
    ${full_name_str}     Convert To String   ${full_name}
    Set global variable    ${REGISTERED_USER_NAME}       ${full_name_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Click Element  ${login_continue_facebook_link}
    Wait Until Element Is Visible      ${facebook_email_inputtext}
    Enter username      ${facebook_email_inputtext}      ${username_str}
    Enter password      ${facebook_password_inputtext}      ${password_str}
    Sleep  1s
    Click Element       ${facebook_login_button}
    Wait Until Element Is Visible    ${signin_navi_panel_signedin}

Login Google user
    Sleep  2s
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    Set Global Variable     ${CUSTOMER_EMAIL}   ${username_str}
    ${full_name}     Get Full Name
    ${full_name_str}     Convert To String   ${full_name}
    Set global variable    ${REGISTERED_USER_NAME}       ${full_name_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Click Element      ${login_continue_google_link}
    Wait Until Element Is Visible      ${gmail_email_id_text}
    Enter username      ${gmail_email_id_text}      ${username_str}
    Click element and wait for another element      ${gmail_email_next_button}      ${gmail_password_text}
    Enter password      ${gmail_password_text}      ${password_str}
    Click Element      ${gmail_password_next_button}
    Sleep  1s
    Wait Until Element Is Visible    ${signin_navi_panel_signedin}

Login Yellow user
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${signin_business_email_text}       ${username_str}
    Sleep  1s
    Click element and wait for another element      ${signin_navi_login_button}      ${yellow_email_inputtext}
    Enter username      ${yellow_email_inputtext}      ${username_str}
    Click element and wait for another element      ${yellow_signin_next_button}      ${yellow_password_inputtext}
    Enter password      ${yellow_password_inputtext}      ${password_str}
    Click element and wait for another element      ${yellow_signin_button}      ${yellow_stay_signin_yes_button}
    Click Element If It Exists      ${yellow_stay_signin_yes_button}

Logged in user should be accurate
    ${full_name}    Get Full Name
    ${full_name_str}     Convert To String   ${full_name}
    Verify page element text:       ${signin_navi_panel_signedin}       ${full_name_str}

Username should be visible
    Wait Until Keyword Succeeds    ${timeout}    ${polltime}    Wait Until Element is Visible  ${navloginpanel_loggedin_user}

