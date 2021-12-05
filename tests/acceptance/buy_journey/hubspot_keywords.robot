*** Settings ***
Resource          ../helper.robot
Resource          ../common_steps.robot
Resource          ../registration_login/registration_keywords.robot
Library           ../util.py
Library           ../config.py
Variables         ../buy_journey/products_sitedata.py
Library           String

*** Keywords ***
User log in to Hubspot
    [Timeout]    120s
    Go to   ${hubspot_contacts_link}
    Sleep   3s
    Complete Hubspot log in procedure

Business details captured in Hubspot
    [Timeout]    120s
    Wait Until Page Contains Element        ${hubspot_search_contact}
    Input text    ${hubspot_search_contact}   ${CUSTOMER_EMAIL}
    Sleep   3s
    Verify page element text:     xpath=//a[contains(@href,'${CUSTOMER_EMAIL}')]        ${CUSTOMER_EMAIL}
    Click Element And Wait For Another Element    ${hubspot_contact_link}    ${hubspot_company}
    Sleep   3s
    Click Element And Wait For Another Element    ${hubspot_company_name}    ${hubspot_company_domain}
    Sleep   3s
    Verify page element text:    ${hubspot_company_domain}    ${BUSINESS_NAME}

Order details captured in HubSpot Deal
    Click element and wait for another element     ${hubspot_deal}   ${hubspot_deal_captured}

