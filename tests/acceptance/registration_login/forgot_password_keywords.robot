*** Settings ***
Documentation     Forgot Password Flow Related Keywords
Resource          ../helper.robot
Resource          ../common_steps.robot
Resource          registration_keywords.robot
Library           ../util.py
Library           ../config.py
Variables         ../site_data.py
Variables         forgot_password_sitedata.py
Variables         login_sitedata.py
Variables         registration_sitedata.py

*** Keywords ***
User has created and activated a new account
    User is in home page and access sign up
    User signs up using a generic email address and valid user information
    User redirects to the activation panel
    User receives an email notification for user registration
    User successfully activate the account with a valid activation code
    User gets the activation success message
    User automatically signed in successfully
    User should be able to sign out successfully

User clicks on forgot password
    Click element and wait for another element    ${signin_navi_panel}    ${signin_navi_login_button}
    Click element and wait for another element    ${signin_navi_panel_forgotpassword_link}    ${forgot_navi_panel_back_to_sign_in_button}

User provides the registered generic email address
    Input text  ${forgot_navi_panel_email_text}  ${CUSTOMER_EMAIL}

User clicks send code
    Click element and wait for another element    ${forgot_navi_panel_send_code_button}    ${reset_password_verification_code_text}

User navigates to reset password screen
    Element should be visible       ${reset_password_new_password_text}
    Element should be visible       ${reset_password_confirm_password_text}
    Element should be visible       ${reset_password_confirm_password_button}

User receives an email notification for forgot password
    [Timeout]    240s
    ${pass_verification_code}=    Read password activation code from Gmail email content
    Set Global Variable  ${pass_verification_code}

User successfully confirm the new password
    Input new password confirmation code
    Input new password
    Input confirm new password
    Click confirm password

Read password activation code from Gmail email content
    [Timeout]      240s
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    Open Gmail homepage by a new browser for password activation code
    Input text    ${gmail_email_id_text}    ${gmail_static_email_address}
    Click element and wait for another element      ${gmail_email_next_button}      ${gmail_password_text}
    Input text    ${gmail_password_text}    ${gmail_static_password}
    Click element and wait for another element      ${gmail_password_next_button}       ${gmail_search_email_primary_text}
    Sleep   3s
    ${element_present}=     Run Keyword And Return Status       Element should be visible       ${gmail_automation_inbox_1st_mail_entry}
    Run Keyword If      ${element_present}     Click Element      ${gmail_automation_inbox_1st_mail_entry}
    Wait Until Page Contains Element    ${gmail_forgot_password_reset_text}
    Sleep   3s
    ${forgot_password_reset_text}     Get Text    ${gmail_forgot_password_reset_text}
    Set Global Variable  ${forgot_verification_code}  ${forgot_password_reset_text}
    [Return]    ${forgot_verification_code}

Open Gmail homepage by a new browser for password activation code
    [Timeout]    120s
    Run Keyword If      '${command_executor}' == 'None'     Open Browser    ${gmail_url}    browser=${browser}
    Run Keyword Unless  '${command_executor}' == 'None'     Open Browser    ${gmail_url}    browser=${browser}     remote_url=${command_executor}    desired_capabilities=${desired_capabilities}
    Wait For Page To Load
    Maximize Browser Window

User provides the unregistered generic email address
    Input text  ${forgot_navi_panel_email_text}  ${signin_unregistered_email_address}

User clicks send code for error
    Click Element If It Exists      ${forgot_navi_panel_send_code_button}
    Wait For Page To Load

User can see the error message on forgot password screen "${error_message}"
    Notification displayed:     ${error_message}

User click the back to sign in button
    Click Element If It Exists      ${forgot_navi_panel_back_to_sign_in_button}
    Wait For Page To Load

User navigates to sign in screen
    Element should be visible       ${signin_navi_login_button}

User provides an empty passcode
    Input new password
    Input confirm new password
    Click confirm password for empty verification code

User provides an invalid new passwords
    Input new password confirmation code
    Input invalid new password
    Input invalid confirm new password
    Click confirm password for invalid password

User provides a mismatching new passwords
    Input new password confirmation code
    Input mismatching new password
    Input mismatching confirm new password
    Click confirm password for mismatching password

User provides an invalid verification code
    Input an invalid password confirmation code
    Input new password
    Input confirm new password
    Click confirm password for invalid verification code

Input new password confirmation code
    Verify page element:  ${reset_password_verification_code_text}
    Input text  ${reset_password_verification_code_text}    ${pass_verification_code}

Input new password
    ${random_number}    Generate Random String  6   [NUMBERS]
    ${random_str_upper}    Generate Random String  1   [UPPER]
    ${random_str_lower}    Generate Random String  3   [LOWER]
    ${random_new_password}    catenate    SEPARATOR=    ${random_str_upper} ${random_str_lower} ${random_number}
    Set Global Variable  ${randomized_new_password}  ${random_new_password}
    Input text  ${reset_password_new_password_text}  ${randomized_new_password}

Input confirm new password
    Input text  ${reset_password_confirm_password_text}  ${randomized_new_password}

Click confirm password
    Click element and wait for another element    ${reset_password_confirm_password_button}    ${signup_navi_activation_success_continue}

Click confirm password for empty verification code
    Click element   ${reset_password_confirm_password_button}

Click confirm password for invalid password
    Click element   ${reset_password_confirm_password_button}

Click confirm password for mismatching password
    Click element   ${reset_password_confirm_password_button}

Click confirm password for invalid verification code
    Click element   ${reset_password_confirm_password_button}

Input email address after reset password
    Input text    ${signin_business_email_text}    ${CUSTOMER_EMAIL}

Input new password after reset password
    Input text    ${signin_business_password_text}    ${randomized_new_password}

Click login with new credentials
    Click element and wait for another element    ${signin_navi_login_button}    ${signin_navi_panel_signedin}

Input invalid new password
    Input text  ${reset_password_new_password_text}  ${forgot_password_invalid_password}

Input invalid confirm new password
    Input text  ${reset_password_confirm_password_text}  ${forgot_password_invalid_password}

Input mismatching new password
    ${mismatch_new_password}    Generate Random String  10   [UPPER][NUMBERS]
    Set Global Variable  ${mismatch_new_password}
    Input text  ${reset_password_new_password_text}  ${mismatch_new_password}

Input mismatching confirm new password
    ${mismatch_confirm_password}    Generate Random String  10   [UPPER][NUMBERS]
    Set Global Variable  ${mismatch_confirm_password}
    Input text  ${reset_password_confirm_password_text}  ${mismatch_confirm_password}

Input an invalid password confirmation code
    ${invalid_code}    Generate Random String  6   [NUMBERS]
    Set Global Variable  ${randomized_invalid_code}  ${invalid_code}
    Input text   ${reset_password_verification_code_text}  ${randomized_invalid_code}

User gets the reset password success message
    Page Should Contain      ${reset_password_success_text_messege}

User click on already got a code
    Click Element And Wait For Another Element     ${reset_password_back_button}    ${already_got_a_code_button}
    Click Element And Wait For Another Element     ${already_got_a_code_button}   ${reset_password_confirm_password_button}

