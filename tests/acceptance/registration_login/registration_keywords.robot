*** Settings ***
Documentation     Customer Registration Flow Related Keywords
Resource          ../helper.robot
Resource          ../common_steps.robot
Library           ../util.py
Library           ../config.py
Variables         registration_sitedata.py
Variables         login_sitedata.py
Resource          login_keywords.robot

*** Keywords ***
User is in home page and access sign up
    User is in home page
    User access sign up

User signs up using a generic email address and valid user information
    Input valid first name
    Input valid last name
    Input valid business email
    Input valid business password
    Input valid confirm business password
    Perform create account

User redirects to the activation panel
    Element should be visible  ${signup_navi_resendcode_button}
    Element should be visible  ${signup_navi_activationcode_text}

User receives an email notification for user registration
    [Timeout]    240s
    ${registration_activation_code}=    Read registration activation code from Gmail email content
    Set Global Variable  ${registration_activation_code}

User successfully activate the account with a valid activation code
    Type in activation code in activation form    ${registration_activation_code}
    Sleep    3s
    Click element and wait for another element    ${signup_navi_activateaccount_button}    ${signup_navi_activation_success_continue}

User gets the activation success message
    Page Should Contain      ${signup_navi_activation_success_text_messege}

User automatically signed in successfully
    Click element and wait for another element      ${signup_navi_activation_success_continue}    ${signin_navi_panel_signedin}
    Wait Until Element Is Not Visible               ${signup_navi_activation_success_continue}

User should be able to sign out successfully
    Sleep  2s
    Click element and wait for another element      ${signin_navi_panel_signedin}    ${signedin_dropdown_signout_option}
    Click element and wait for another element    ${signedin_dropdown_signout_option}       ${signin_navi_panel}

Read registration activation code from Gmail email content
    [Timeout]      240s
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    Open Gmail homepage by a new browser for registration activation code
    Input text    ${gmail_email_id_text}    ${gmail_static_email_address}
    Click element and wait for another element      ${gmail_email_next_button}      ${gmail_password_text}
    Input text    ${gmail_password_text}    ${gmail_static_password}
    Click element and wait for another element      ${gmail_password_next_button}       ${gmail_automation_inbox_1st_mail_entry}
    Sleep   3s
    ${element_present}=     Run Keyword And Return Status       Element Should Be Visible       ${gmail_automation_inbox_1st_mail_entry}
    Run Keyword If      ${element_present}     Click Element      ${gmail_automation_inbox_1st_mail_entry}
    Wait Until Page Contains Element    ${gmail_registration_verification_code}
    Sleep   3s
    ${reg_verification_code}     Get Text    ${gmail_registration_verification_code}
    Set Global Variable      ${reg_verification_code}
    [Return]    ${reg_verification_code}

Open Gmail homepage by a new browser for registration activation code
    [Timeout]    120s
    Run Keyword If      '${command_executor}' == 'None'     Open Browser    ${gmail_url}    browser=${browser}
    Run Keyword Unless  '${command_executor}' == 'None'     Open Browser    ${gmail_url}    browser=${browser}     remote_url=${command_executor}    desired_capabilities=${desired_capabilities}
    Wait For Page To Load
    Maximize Browser Window

Type in activation code in activation form
    [Arguments]    ${code}
    Input text  ${signup_navi_activationcode_text}  ${code}

User register to the portal with valid information
    User is in home page and access sign up
    User signs up using a generic email address and valid user information
    User redirects to the activation panel

User resend the activation code
    Click Element If It Exists      ${signup_navi_resendcode_button}

User activate the profile with recent activation code
    [Timeout]    240s
    ${reg_resent_activation_code}=    Read registration activation code from Gmail email content
    Set Global Variable  ${reg_resent_activation_code}
    User successfully activate the account with a resent activation code

User successfully activate the account with a resent activation code
    Type in activation code in activation form    ${reg_resent_activation_code}
    Sleep    3s
    Click element and wait for another element     ${signup_navi_activateaccount_button}   ${signup_navi_activation_success_continue}
    Click element        ${signup_navi_activation_success_continue}


User tries to activate account with already used valid activation code
    Type in activation code in activation form    ${registration_activation_code}
    Sleep    3s
    Click Element If It Exists      ${signup_navi_activateaccount_button}

User can see the error message on registration screen "${error_message}"
    Notification displayed:     ${error_message}

user is in home page
   Go To Url And Wait For Element    ${TEST_URL}    ${signin_navi_panel}

user access sign up
#    Click element and wait for another element    ${signin_navi_panel}    ${signin_navi_login_button}
    Click element and wait for another element    ${signup_navi_signup_link}    ${signup_navi_createaccount_button}

user on signup after checkout
    Click element and wait for another element    ${signin_navi_createaccount_link}    ${signup_navi_createaccount_button}

user on signin after checkout
    Click element     ${signin_navi_login_button}

input valid first name
    Input text  ${signup_firstname_text}  Kumindu

input valid last name
    Input text  ${signup_lasttname_text}  Dias

input valid business email
    generate valid business email
    Input text  ${signup_business_email_text}  ${CUSTOMER_EMAIL}

generate valid business email
    ${random_registration_number}    Generate Random String  8   [NUMBERS]
    ${unregistered_email}    catenate    SEPARATOR=    newworldtestautomation+  ${random_registration_number}    @gmail.com
    Set Global Variable     ${REGISTERED_USER_NAME}    ${signup_full_name}
    Set Global Variable     ${CUSTOMER_EMAIL}   ${unregistered_email}

input valid business password
     ${random_number}    Generate Random String  5   [NUMBERS]
     ${random_str_upper}    Generate Random String  2   [UPPER]
     ${random_str_lower}    Generate Random String  3   [LOWER]
     ${random_string}   catenate    SEPARATOR=    ${random_str_upper} ${random_str_lower} ${random_number}
    Set Global Variable  ${randomized_password}  ${random_string}
    Input text  ${signup_password_text}  ${randomized_password}

input valid confirm business password
    Input text  ${signup_confirm_password_text}  ${randomized_password}

perform create account
    Click element and wait for another element    ${signup_navi_createaccount_button}    ${signup_navi_activateaccount_button}

user go back to the signup
    sleep    2s
    Click Element And Wait For Another Element     ${back_to_signup_button}   ${already_got_a_code_button}

user go to already got a code
    Click Element And Wait For Another Element     ${already_got_a_code_button}   ${signup_navi_activateaccount_button}
    Input text      ${signup_business_email_textbox}     ${CUSTOMER_EMAIL}

