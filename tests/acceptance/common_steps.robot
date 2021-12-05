*** Settings ***
Library             SeleniumLibrary    30
Variables           registration_login/registration_sitedata.py
Variables           registration_login/login_sitedata.py
Variables           site_data.py
Resource            helper.robot
Library             util.py
Library             config.py

*** Keywords ***
Verify page element:
    [Arguments]    ${element_name}
    Element Should Be Visible    ${element_name}

Verify page element text:
    [Arguments]    ${element_name}    ${element_text}
    ${element_text_actual}    Get Text    ${element_name}
    Should Contain    ${element_text_actual}    ${element_text}    [ERROR] Text value for element ${element_name} is "${element_text_actual}" - SHOULD BE "${element_text}"

Element Text Should Not Be Empty
    [Arguments]     ${element}
    ${element_text}     Get Element Text If It Exists   ${element}
    Should Not Be Empty     ${element_text}

Set User
    [Arguments]  ${user}
    [Documentation]  Temporary way to set test session
    ${username}     Read Username  ${user}
    ${password}     Read Password  ${user}
    ${fullname}     Read Full Name  ${user}
    Set to Dictionary       ${test_session}      role=${user}    username=${username}    password=${password}   fullname=${fullname}
    log  ${test_session}

Get Role
    ${return_role}      Get From Dictionary     ${test_session}     role
    [Return]    ${return_role}

Get Username
    ${return_username}      Get From Dictionary     ${test_session}     username
    [Return]    ${return_username}

Get Password
    ${return_password}      Get From Dictionary     ${test_session}     password
    [Return]    ${return_password}

Get Login Method
    ${return_method}        Get From Dictionary     ${test_session}     login_method
    [Return]    ${return_method}

Get Full Name
    ${return_full_name}      Get From Dictionary     ${test_session}     fullname
    [Return]    ${return_full_name}

Enter username
    [Arguments]     ${element}      ${username}
    Input Text      ${element}      ${username}

Enter password
    [Arguments]     ${element}      ${password}
    Input Text      ${element}      ${password}
