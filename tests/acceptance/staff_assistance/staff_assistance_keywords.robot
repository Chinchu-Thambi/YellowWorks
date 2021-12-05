*** Settings ***
Documentation     Customer Login Flow Related Keywords
Variables         staff_assistance_sitedata.py
Resource          ../registration_login/login_keywords.robot
Resource          ../common_steps.robot

*** Keywords ***
User perform yellow staff login
    Set User    yellow staff
    Login Yellow user

Staff confirm the customer email address
    Confirm the customer email address

Staff confirm the company
    Click company dropdown
    Select the company related to the customer email address
    Click confirm customer

Staff banner and valid content should be visible
    Verify the staff assistance header banner

Confirm the customer email address
    Input Text                              ${staff_assistance_customer_email_inputtext}     ${staff_assistance_customer_email_address_01}
    Wait Until Page Contains Element        ${staff_assistance_company_dropdown}

Verify the staff assistance header banner
    Wait Until Element Contains     ${staff_assistance_company_name_label}          ${staff_assistance_header_company_name_label_0101}
    Verify page element text:       ${staff_assistance_email_address_label}         ${staff_assistance_customer_email_address_01}
    Verify page element text:       ${staff_assistance_currently_access_label}      ${staff_assistance_header_text_label}

User change the customer
    Click element and wait for another element      ${staff_assistance_header_banner_change_link}   ${staff_assistance_customer_email_inputtext}
    Input Text                                      ${staff_assistance_customer_email_inputtext}     ${staff_assistance_customer_email_address_02}
    Click company dropdown
    Select the company related to the customer email address
    Click confirm customer

Staff banner and valid content should be visible for the changed customer
    Wait Until Element Contains     ${staff_assistance_company_name_label}          ${staff_assistance_header_company_name_label_0201}
    Verify page element text:       ${staff_assistance_email_address_label}         ${staff_assistance_customer_email_address_02}
    Verify page element text:       ${staff_assistance_currently_access_label}      ${staff_assistance_header_text_label}

User change the company
    Click element and wait for another element      ${staff_assistance_header_banner_change_link}   ${staff_assistance_customer_email_inputtext}
    Input Text                                      ${staff_assistance_customer_email_inputtext}     ${staff_assistance_customer_email_address_03}
    Click company dropdown
    Select the second company related to the customer email address
    Click confirm customer

Confirm the customer email address for change company
    Input Text                              ${staff_assistance_customer_email_inputtext}     ${staff_assistance_customer_email_address_03}
    Wait Until Page Contains Element        ${staff_assistance_company_dropdown}

Staff confirm the company for change company
    Click company dropdown
    Select the company related to the customer email address for the change company
    Click confirm customer

Staff banner and valid content should be visible for the changed company
    Wait Until Element Contains     ${staff_assistance_company_name_label}          ${staff_assistance_header_company_name_label_0302}
    Verify page element text:       ${staff_assistance_email_address_label}         ${staff_assistance_customer_email_address_03}
    Verify page element text:       ${staff_assistance_currently_access_label}      ${staff_assistance_header_text_label}

Click confirm customer
    Click element and wait for another element      ${staff_assistance_company_select_button}        ${staff_assistance_header_banner_change_link}

Select the company related to the customer email address
    Click Element If It Exists                      ${staff_assistance_company_dropdown_option_01}

Select the second company related to the customer email address
    Sleep  1s
    Click Element If It Exists                      ${staff_assistance_changed_company_dropdown_option_02}

Click company dropdown
    Sleep   1s
    Click element and wait for another element      ${staff_assistance_company_dropdown}      ${staff_assistance_company_dropdown_option_01}

Click select customer link
    Click element and wait for another element      ${staff_assistance_header_company_link}      ${staff_assistance_customer_email_inputtext}

Select the company related to the customer email address for the change company
    Click Element If It Exists                      ${staff_assistance_changed_company_dropdown_option_01}