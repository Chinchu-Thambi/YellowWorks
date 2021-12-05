*** Settings ***
Documentation     This contains the functions to validate Axle content
Variables         axle_sitedata.py
Resource          ../helper.robot
Resource          ../common_steps.robot
Library           ../util.py
Library           ../config.py

*** Keywords ***
Company details captured in axle
    User access axle
    Complete axle log in process
    Select customer search tab
    User search for customer using "${BUSINESS_NAME}" in axle
    Verify the customer basic information

User access axle
    ${status}=    Run keyword and return status    Location Should Contain    ${AXLE_URL}
    Run keyword unless    ${status}    Go to    ${AXLE_URL}
    Wait Until Element Is Visible       ${axle_login_link}

Complete axle log in process
    ${pagetitle}    Get Title
    ${status}=    Run keyword and return status    Should contain    ${pagetitle}    ${axle_sign_in_page_title}
    Run keyword if    ${status}    Run keywords
    ...    Sign in axle by user credentials
    ...    AND  Wait until element is visible    ${axle_side_menu_customers}

Sign in axle by user credentials
    Get axle user credentials
    Perform axle log in process

Get axle user credentials
    Set User    axle user
    ${axle_username}     Get Username
    ${axle_username_str}     Convert To String   ${axle_username}
    Set test variable       ${axle_username_str}
    ${axle_password}     Get Password
    ${axle_password_str}     Convert To String   ${axle_password}
    Set test variable       ${axle_password_str}

Perform axle log in process
    Click Element If It Exists    ${axle_login_link}
    Wait until element is visible    ${axle_login_username_textfield}
    Enter Username  ${axle_login_username_textfield}  ${axle_username_str}
    Enter password  ${axle_login_password_textfield}  ${axle_password_str}
    Click Element   ${axle_login_popup_submit_button}

Select customer search tab
    Wait Until Element is Visible    ${axle_side_menu_customers_click}
    Click Element At Coordinates    ${axle_side_menu_customers}    50    0      #Element co-ordinates are outside the range. To Click the element specified value of x co-ordinate as 50
    Wait Until Element is Visible    ${axle_customer_search_account_number_textfield}

User search for customer using "${BUSINESS_NAME}" in axle
    Click Element If It Exists      ${axle_customer_search_account_name_dropdown}
    Wait until element is visible   ${axle_account_name_dropdown_equals_option}
    Click Element If It Exists      ${axle_account_name_dropdown_equals_option}
    Input Text    ${axle_customer_search_account_name_textfield}    ${BUSINESS_NAME}
    Click Link    ${axle_customer_search_apply_button}
    Wait For Page To Load
    Sleep    2s
    : FOR  ${i}  IN RANGE  0  5
    \    ${status}=    Run keyword and return status    Element Should Be Visible    ${axle_results_customer_view_button}
    \    Exit for loop if    ${status}
    \    Run Keyword if    ${status} == 'False'
            ...    Reload Page
            ...    AND    Clear Element Text    ${axle_customer_search_account_name_textfield}
            ...    AND    Input Text    ${axle_customer_search_account_name_textfield}    ${BUSINESS_NAME}
            ...    AND    Click Element    ${axle_customer_search_apply_button}
            ...    AND    Sleep    10s
    Run Keyword if    '${status}' == 'False' and ${i+1}==5    FAIL    Unable to find the customer in Axle
    ...     ELSE    Log     Customer is available in Axle

Verify the customer basic information
    # This keyword need to be updated when the requirement is finalized
    ${current_acct_number}    Get Text    ${axle_search_results_account_number}
    Should Be Equal As Strings    ${current_acct_number}    ${CUSTOMER_ID}
    ${current_buss_name}    Get Text    ${axle_search_results_account_name}
    Should Be Equal As Strings    ${current_buss_name}    ${BUSINESS_NAME}
    ${current_eplus_id}    Get Text    ${axle_search_results_eplus_id}
    Should Be Equal As Strings    ${current_eplus_id}    ${CUSTOMER_ID}