*** Settings ***
Documentation     Buy online journey for Yellow Products keywords
Resource          ../helper.robot
Resource          ../common_steps.robot
Resource          ../registration_login/registration_keywords.robot
Resource          ../registration_login/login_keywords.robot
Resource          ../registration_login/forgot_password_keywords.robot
Resource          ../buy_journey/hubspot_api_keywords.robot
Library           ../util.py
Library           ../config.py
Variables         ../site_data.py
Variables         print_buy_journey_sitedata.py
Variables         ../registration_login/login_sitedata.py
Variables         ../registration_login/registration_sitedata.py
Variables         ../registration_login/forgot_password_sitedata.py
Variables         ../buy_journey/products_sitedata.py

*** Keywords ***
User navigates to Yellow Pages page and initiates the print brief
    User is on yellow pages page
    Verify the Yellow pages page
    Click GET STARTED button
    Navigate to the onboarding journey for print

User is on yellow pages page
    Go To Url And Wait For Element    ${TEST_URL}${print_profile_link}     ${print_page_heading}

Verify the Yellow pages page
    Page Should Contain Element    ${print_page_heading}

Click GET STARTED button
    Click Element    ${print_get_started}

Navigate to the onboarding journey for print
    Should Be Equal    ${TEST_URL}${print_onboarding_url}      https://sandbox.beta.yellow.co.nz/our-products/product-brief/print

User sign up
    User able to sign up

User is signed in
    Open navigation login panel
    User Sign In
    Sleep  2s
    Click Element If It Exists    ${welcome_modal_Get_started_button}

#===============================================================================================================================================#
# Print- Brief
#===============================================================================================================================================#
User fills in the print brief info
    User fills the business name and physical address
    User hits next
    User fills in primary phone number
    User fills in additional phone number
    User fills in email address
    User fills in Website URL
    User hits next
    User selects the Marlborough YP book
    User hits next
    User selects business category-Abrasives
    User hits next

User selects print Free Listing
    User selects the free listing design
    User hits next

User selects print Enhanced Listing
    User selects the enhanced listing design
    User hits next

User selects print 3 Line Listing
    User selects the 3Line listing design
    User hits next

User selects print 4 Line Listing
    User selects the 4Line listing design
    User hits next

User selects print 5 Line Listing
    User selects the 5Line listing design
    User hits next

User fills the business name and physical address
    Wait Until Page Contains Element    ${print_brief_bus_name_title}
    ${bus_name} =    Generate Random String    2    [NUMBERS]
    Input Text    ${print_brief_bus_name_input}    ${print_brief_bus_name}${bus_name}
    ${print_brief_business_name}   Get Element Attribute    ${print_brief_bus_name_input}     attribute=value
    set global variable    ${print_brief_business_name}
    Input Text    ${print_brief_addr_input}    604 Great South Road Ellerslie,Auckland,New Zealand
    Sleep    2s
    Press Keys        ${print_brief_addr_input}     ARROW_DOWN+RETURN
    Wait Until Page Contains Element    ${print_brief_search_new_addr_link}

User fills in primary phone number
    Wait Until Page Contains Element    ${print_brief_primary_ph_num_title}
    Click Element And Wait For Another Element    ${print_brief_primary_ph_area_code}    ${print_brief_primary_area_code_021}
    Click Element    ${print_brief_primary_area_code_021}
    Input Text    ${print_brief_primary_ph_number_input}    2673648

User fills in additional phone number
    Wait Until Page Contains Element    ${print_brief_secondary_ph_num_title}
    Click Element And Wait For Another Element    ${print_brief_secondary_ph_area_code}    ${print_brief_secondary_area_code_022}
    Click Element    ${print_brief_secondary_area_code_022}
    Input Text    ${print_brief_secondary_ph_number_input}    2673648

User fills in email address
    Wait Until Page Contains Element    ${print_brief_email_title}
    Input text    ${print_brief_email_input}    testemail@gmail.com

User fills in Website URL
    Wait Until Page Contains Element    ${print_brief_website_title}
    Input Text    ${print_brief_website_input}    testwebsite@gmail.com

User hits next
    Click Element    ${print_brief_next_button}

User selects the Marlborough YP book
    Wait Until Page Contains Element    ${print_brief_yellow_page_book_title}
    Input Text    ${print_brief_yellow_book_select}    Marl
    Sleep    2s
    Press Keys        ${print_brief_yellow_book_select}     ARROW_DOWN+RETURN
    ${book_selected} =    Get Text    ${print_brief_selected_book_holder}
    set global variable    ${book_selected}

User selects the Auckland YP book
    Wait Until Page Contains Element    ${print_brief_yellow_page_book_title}
    Input Text    ${print_brief_yellow_book_select}    Auck
    Sleep    2s
    Press Keys        ${print_brief_yellow_book_select}     ARROW_DOWN+RETURN

User selects business category-Abrasives
    Wait Until Page Contains Element    ${print_brief_bus_category_title}
    Input Text    ${print_brief_category_input}    Abrasives
    Sleep    2s
    Press Keys        ${print_brief_category_input}     ARROW_DOWN+RETURN

User selects the free listing design
    Wait Until Page Contains Element    ${print_brief_book_design_title}
    Input Text    ${print_brief_design_input}    Free
    Sleep    2s
    Press Keys        ${print_brief_design_input}     ARROW_DOWN+RETURN
    Verify page element text:    ${print_brief_design_value_holder}    Free Listing
    ${design_selected} =    Get Text    ${print_brief_design_value_holder}
    set global variable    ${design_selected}
    Scroll to Element to View    ${print_brief_next_button}

User selects the enhanced listing design
    Wait Until Page Contains Element    ${print_brief_book_design_title}
    Input Text    ${print_brief_design_input}    Enhanced
    Sleep    2s
    Press Keys        ${print_brief_design_input}     ARROW_DOWN+RETURN
    Verify page element text:    ${print_brief_design_value_holder}    Enhanced Bold Name Listing
    ${design_selected} =    Get Text    ${print_brief_design_value_holder}
    set global variable    ${design_selected}
    Scroll to Element to View    ${print_brief_next_button}

User selects the 3Line listing design
    Wait Until Page Contains Element    ${print_brief_book_design_title}
    Input Text    ${print_brief_design_input}    3 Line
    Sleep    2s
    Press Keys        ${print_brief_design_input}     ARROW_DOWN+RETURN
    Verify page element text:    ${print_brief_design_value_holder}    3 Line Listing
    ${design_selected} =    Get Text    ${print_brief_design_value_holder}
    set global variable    ${design_selected}
    Scroll to Element to View    ${print_brief_next_button}

User selects the 4Line listing design
    Wait Until Page Contains Element    ${print_brief_book_design_title}
    Input Text    ${print_brief_design_input}    4 Line
    Sleep    2s
    Press Keys        ${print_brief_design_input}     ARROW_DOWN+RETURN
    Verify page element text:    ${print_brief_design_value_holder}    4 Line Listing
    ${design_selected} =    Get Text    ${print_brief_design_value_holder}
    set global variable    ${design_selected}
    Scroll to Element to View    ${print_brief_next_button}

User selects the 5Line listing design
     Wait Until Page Contains Element    ${print_brief_book_design_title}
    Input Text    ${print_brief_design_input}    5 Line
    Sleep    2s
    Press Keys        ${print_brief_design_input}     ARROW_DOWN+RETURN
    Verify page element text:    ${print_brief_design_value_holder}    5 Line Listing
    ${design_selected} =    Get Text    ${print_brief_design_value_holder}
    set global variable    ${design_selected}
    Scroll to Element to View    ${print_brief_next_button}

User proceeds to payment
    Scroll to Element to View    ${print_proceedtopayment_button}
    Click Element    ${print_proceedtopayment_button}

#===============================================================================================================================================#
# Print- Checkout  Page
#===============================================================================================================================================#
User submits the order for ${new_existing} customer
    Wait Until Page Contains Element    ${checkout_page_header}
    GIVEN Cart and Company Details section should be available
        Click Element If It Exists    ${proceed_with_purchase}
    THEN Run Keyword If     "${new_existing}" == "new"    Add Business details
        AND Run Keyword if    '${design_selected}' == 'Free Listing'    Payment details section should not be available
            ...    ELSE   Add Payment details
        Verify print cart summary is accurate
        AND Run Keyword if    "${design_selected}" == "Free Listing"    Select terms of business authorization
            ...    ELSE    Select terms of business and card authorization
    WHEN Click on Confirm Order
    THEN User navigates to order confirmation page

Verify print cart summary is accurate
     GIVEN Cart should have the print product line based on the brief selection
     THEN Verify the print product subtotal

Cart should have the print product line based on the brief selection
    Verify page element:      ${print_checkout_product_line}
    ${product_line} =    Get Text    ${print_checkout_product_line}
    Should Be Equal As Strings    ${product_line}    ${expected_print_product_line}

Verify the print product subtotal
    ${subtotal} =    Get Text    ${subtotal_holder}
    Run Keyword if    "${design_selected}" == "Free Listing"    Should Be Equal As Strings    ${subtotal}    $0.00
    ...    ELSE IF    "${design_selected}" == "Enhanced Bold Name Listing"    Should Be Equal As Strings    ${subtotal}    $160.00
    ...    ELSE IF    "${design_selected}" == "3 Line Listing"    Should Be Equal As Strings    ${subtotal}    $100.00
    ...    ELSE IF    "${design_selected}" == "4 Line Listing"    Should Be Equal As Strings    ${subtotal}    $200.00
    ...    ELSE IF    "${design_selected}" == "5 Line Listing"    Should Be Equal As Strings    ${subtotal}    $300.00

#===============================================================================================================================================#
# Print- My Products Page
#===============================================================================================================================================#
User navigates to My products page
    Click Element    ${set_up_my_products_button}
    Sleep  2s
    Click Element If It Exists    ${welcome_modal_Get_started_button}

Verify my products page profile status is BOOKED
    Wait Until page contains Element    ${my_products_whole_div}
    Sleep  3s
    Reload Page
    Wait Until page contains Element    ${my_products_whole_div}
    Scroll to Element to View    //h3[contains(text(),'${print_brief_business_name}')]//parent::div//parent::div//parent::section
    ${holder} =    Get Text    //h3[contains(text(),'${print_brief_business_name}')]//parent::div//parent::div//parent::section/div[2]//div[2]/h3/strong
    Run Keyword If    "${holder}" != "BOOKED"    Run Keywords    Reload Page
    ...    AND    Sleep  4s
    ...    AND    Scroll to Element to View    //h3[contains(text(),'${print_brief_business_name}')]//parent::div//parent::div//parent::section
    ...    AND    Reload Page
    ...    AND    Wait Until Element Contains    //h3[contains(text(),'${print_brief_business_name}')]//parent::div//parent::div//parent::section/div[2]//div[2]/h3/strong    BOOKED
    Should Be Equal As Strings    ${holder}    BOOKED
