*** Settings ***
Documentation    Suite description
Resource            ../helper.robot
Resource            ../common_steps.robot
Resource            ../registration_login/login_keywords.robot
Resource            ../registration_login/registration_keywords.robot

Library             ../util.py
Library             ../config.py
Variables           ../registration_login/login_sitedata.py
Variables           ../registration_login/registration_sitedata.py
Variables           account_settings_sitedata.py

*** Keywords ***
User lands on Account Settings page
    Sleep    1s
    Click element    ${welcome_window_close_button}
    Sleep    3s

User navigates to Account Settings page
    Wait Until Page Contains Element    ${main_page_account_button}
    Click element     ${main_page_account_button}
    Click element    ${account_button_list_account_settings}

Account settings page should have business and Payment info of the customer
    Wait Until Page Contains Element    ${account_settings_business_info}
    Wait Until Page Contains Element     ${account_settings_payment_details}

User registers with Yellow
    GIVEN User is in home page and access sign up
    WHEN User signs up using a generic email address and valid user information
    THEN User redirects to the activation panel
        AND User receives an email notification for user registration
    WHEN User successfully activate the account with a valid activation code
    THEN User gets the activation success message
        AND User automatically signed in successfully

User updates the password
    User clicks on Update password

User signs out successfully
    Click Element And Wait For Another Element     ${signin_navi_panel_signedin}    ${signedin_dropdown_signout_option}
    Click Element    ${signedin_dropdown_signout_option}

User login with the new password should be successful
    User is in home page
    User brings up the navigation panel
    User logs in with the new password
    Login should be successful
#------------------------------------------------------------------------------------------------------
User clicks on Update password
    Wait For Page To Load
    Click Element And Wait For Another Element    ${account_settings_password_update_link}     ${account_settings_password_update_h2}
    Input Text    ${account_settings_update_password_current_password}    ${randomized_password}
    Input Text    ${account_settings_update_password_enter_new_password}      Newpassword@123
    Input Text    ${account_settings_update_password_reenter_new_password}    Newpassword@123
    ${newpassword} =    Set Variable    Newpassword@123
    Click Element And Wait For Another Element    ${account_settings_update_password_confirm}    ${account_settings_update_password_continue}
    Click element    ${account_settings_update_password_continue}

User logs in with the new password
   Wait For Page To Load
   Click Element    ${signin_business_email_text}
   Input Text    ${signin_business_email_text}    ${CUSTOMER_EMAIL}
   Click Element    ${signin_business_password_text}
   Input Text     ${signin_business_password_text}    Newpassword@123
   Click Element    ${signin_navi_login_button}
   Sleep    3s

User clicks on Set Up Profile
   Wait For Page To Load
   Wait Until Page Contains Element   ${account_settings_SetUpProfile_link}
   Click Element    ${account_settings_SetUpProfile_link}

User lands on Yellow Profile page
    Sleep    4s
    Click Element    ${account_settings_link_to_profile}
