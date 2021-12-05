*** Settings ***
Resource          ../helper.robot
Resource          ../common_steps.robot
Resource          ../registration_login/registration_keywords.robot
Library           ../util.py
Library           ../config.py
Library           String
Variables         products_sitedata.py
Resource          products_keyword_sbj.robot
Resource          ../registration_login/login_keywords.robot

*** Keywords ***

New user record should be created in Stripe
    Go to Stripe and log in
    Sign in Stripe by user credentials
    Search for the customer

Go to Stripe and log in
    Go To Url And Wait For Element     ${STRIPE_URL}       ${stripe_username}

Sign in Stripe by user credentials
    Input text       ${stripe_username}    ytechqa.testaccount@yellow.co.nz
    Input text       ${stripe_password}    Darkhorn50!
    Click Element    ${stripe_signIn}

Search for the customer
    Wait until element is visible    ${stripe_home_page_top_search_input}
    : FOR  ${i}  IN RANGE  0  3
    \   Input Text    ${stripe_home_page_top_search_input}    ${CUSTOMER_EMAIL}
    \   Press Key    ${stripe_home_page_top_search_input}    ${ascii_enter_key}
    \   ${customer_loc}=    Set Variable    xpath=//tr/td/a[contains(@href, '/test/customers/')]//span[contains(text(), '${CUSTOMER_EMAIL}')]
    \   ${status}=    Run keyword and return status    Wait until element is visible    ${customer_loc}
    \   Exit for loop if    ${status}
    Click Element And Wait For Another Element    ${customer_loc}    ${stripe_customer_page_section_name}
    Sleep   3s
    Verify page element text:    xpath=//span[text()='${BUSINESS_NAME}']         ${BUSINESS_NAME}

New user card information should be captured in Stripe
    ${results_list}     Create List
    ${results_list}=     Get_customer_card_info     ${CUSTOMER_EMAIL}
    Should Be Equal As Strings      ${results_list}[0]      ${VISA_CARD_HOLDER}      #Kane Williamson
    Should Be Equal As Strings      ${results_list}[1]      ${CC_LAST_DOGITS}             #1111
    Should Be Equal As Strings      ${results_list}[2]      ${EXPIRY_DAY}                 #2
    Should Be Equal As Strings      ${results_list}[3]      ${EXPIRY_YEAR}                #2022

New user information should be captured in Stripe
    ${results_list}     Create List
    ${results_list}=     Get_customer_card_info     ${CUSTOMER_EMAIL}
    Should Be Equal As Strings      ${results_list}[0]      Kane Williamson