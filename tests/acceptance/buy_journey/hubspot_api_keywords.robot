*** Settings ***
Documentation    This contains the functions to validate HubSpot content
Library          Process
Library          hubspot_api_functions.py
Library          String
Variables        ../registration_login/login_sitedata.py
Resource         ../registration_login/registration_keywords.robot
Resource         ../registration_login/login_keywords.robot
Resource         products_keyword_sbj.robot

*** Keywords ***
User get all required hubspot details through api with amount
    Sleep    2s
    Contact details captured in hubspot
    Company details captured in hubspot
    Deal details captured in hubspot "${total_actual_amt}.00"

Deleting Contact, Company and Deal records is successful
    Delete contact record
    Delete company record
    Delete deal record

Delete contact record
    ${contact_delete_status}=       Delete_contact_using_contact_id     ${CONTACT_ID}
    ${string_contact_delete_status}     Convert To String       ${contact_delete_status}
    Should Be Equal As Strings     ${string_contact_delete_status}      200

Delete company record
    ${company_delete_status}=       Delete_company_using_company_id     ${COMPANY_ID}
    ${string_company_delete_status}     Convert To String       ${company_delete_status}
    Should Be Equal As Strings     ${string_company_delete_status}      200

Delete deal record
    ${deal_delete_status}=       Delete_deal_using_deal_id     ${DEAL_ID}
    ${string_deal_delete_status}     Convert To String       ${deal_delete_status}
    Should Be Equal As Strings     ${string_deal_delete_status}      204

Deleting Company and Deal records is successful
    Delete Company and Deal records for existing customer

Contact details captured in hubspot
    ${hubspot_contact_id}=      Get_contact_id_using_email   ${CUSTOMER_EMAIL}
    ${CONTACT_ID}     Convert To String   ${hubspot_contact_id}
    Set Global Variable     ${CONTACT_ID}
    ${contact_full_name}=       Get_contact_full_name        ${CONTACT_ID}
    Should Be Equal As Strings      ${contact_full_name}      ${REGISTERED_USER_NAME}

Company details captured in hubspot
    ${company_id_response}=     Get_company_id_using_contact_id     ${CONTACT_ID}
    ${COMPANY_ID}       Convert To String       ${company_id_response}
    Set Global Variable     ${COMPANY_ID}
    ${company_name}=    Get_company_name_using_company_id   ${COMPANY_ID}
    Should Be Equal As Strings      ${company_name}    ${BUSINESS_NAME}

Deal details captured in hubspot "${amount}"
    ${deal_id_response}=     Get_deal_id_using_contact_id       ${CONTACT_ID}
    ${DEAL_ID}     Convert To String   ${deal_id_response}
    Set Global Variable     ${DEAL_ID}
    ${deal_amount}=    Get_deal_amount_using_deal_id   ${DEAL_ID}
    Should Be Equal     ${deal_amount}.00     ${amount}

Delete Company and Deal records for existing customer
    ${existing_hubspot_contact_id}=      Get_contact_id_using_email   ${username_str}
    ${existing_contact_id}     Convert To String   ${existing_hubspot_contact_id}
    ${existing_company_id_response}=     Get_company_id_using_contact_id     ${existing_contact_id}
    ${existing_company_id}       Convert To String       ${existing_company_id_response}
    ${existing_company_delete_status}=       Delete_company_using_company_id     ${existing_company_id}
    ${existing_company_delete_status}     Convert To String       ${existing_company_delete_status}
    Should Be Equal As Strings     ${existing_company_delete_status}      200
    ${existing_deal_id_response}=     Get_deal_id_using_contact_id       ${existing_contact_id}
    ${existing_deal_id}     Convert To String   ${existing_deal_id_response}
    ${existing_deal_delete_status}=       Delete_deal_using_deal_id     ${existing_deal_id}
    ${existing_deal_delete_status}     Convert To String       ${existing_deal_delete_status}
    Should Be Equal As Strings     ${existing_deal_delete_status}      204

Deleting Deal record is successful
    ${existing_hubspot_contact_id}=      Get_contact_id_using_email     ${username_str}
    ${existing_contact_id}     Convert To String   ${existing_hubspot_contact_id}
    ${existing_deal_id_response}=     Get_deal_id_using_contact_id       ${existing_contact_id}
    ${existing_deal_id}     Convert To String   ${existing_deal_id_response}
    ${existing_deal_delete_status}=       Delete_deal_using_deal_id     ${existing_deal_id}
    ${existing_deal_delete_status}     Convert To String       ${existing_deal_delete_status}
    Should Be Equal As Strings     ${existing_deal_delete_status}      204