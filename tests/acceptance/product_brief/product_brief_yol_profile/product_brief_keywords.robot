*** Settings ***
Documentation       Product Brief Flow Related Keywords
Resource            ../../registration_login/login_keywords.robot
Resource            ../../common_steps.robot
Resource            ../../helper.robot
Resource            products_keywords_sbj.robot
Variables           ../../buy_journey/products_sitedata_sbj.py
Variables           product_brief_sitedata.py
Variables           ../../registration_login/login_sitedata.py
*** Keywords ***
User is completed the buy online journey
    Purchase Yellow Basic+Gold profile for User

User login to customer portal
    User is on the home page
    User brings up the navigation panel
    User logs in using valid email address and password
    Login should be successful

User clicks set up my product on confirmation page and lands on My Products page
    Wait Until Element is Visible      ${product_brief_setup_my_products_button}
    Click element    ${product_brief_setup_my_products_button}
    Wait Until Element is Visible    ${my_products_set_up_button}
    Wait Until Element is Visible    ${welcome_modal_Get_started_button}
    Click Element    ${welcome_modal_Get_started_button}

User starts onboarding journey
    Wait Until Element is Visible    ${my_products_set_up_button}
    Click Element If It Exists    ${welcome_window_close_button}
    Click Element    ${my_products_set_up_button}
    Location Should Contain    ${TEST_URL}/my-yellow/onboarding

User complete business details page
    Add brief business details
    User clicks NEXT button
    Element Should Be Visible       ${prod_brief_physical_headline_label}

Add brief business details
    Wait Until Element Is Enabled       ${prod_brief_business_trading_name_inputtext}
    Verify the texts on business details page
    Input Text      ${prod_brief_business_trading_name_inputtext}       Test Business Trading Name
    ${prod_brief_business_name}      Get Text       ${prod_brief_business_trading_name_inputtext}
    Set Global Variable      ${BRIEF_BUSINESS_NAME}       ${prod_brief_business_name}
    Input Text      ${prod_brief_business_about_inputtext}      Get customers finding you instead of you chasing them. We’ve got smart, cost-effective solutions that work hard for your business.

User clicks NEXT button
    Click Element If It Exists      ${product_brief_next_button}
    Wait For Page To Load

User clicks BACK button
    Click Element If It Exists      ${product_brief_back_button}
    Wait For Page To Load

User clicks DONE button
    Click Element If It Exists          ${prod_brief_business_confirmation_done_button}
    Wait For Page To Load

User complete default physical address on profile page
    Verify the texts on business physical address page
    User clicks NEXT button
    Element Should Be Visible       ${prod_brief_servicing_area_headline_label}

User complete non default physical address on profile page
    Verify the texts on business physical address page
    User clicks NEXT button
    Element Should Be Visible       ${prod_brief_servicing_area_headline_label}

User select Yes to show physical address on the profile page
    Click Element If It Exists          ${prod_brief_physical_address_show_yes_radiobutton}

User select No to show physical address on the profile page
    Click Element If It Exists          ${prod_brief_physical_address_show_no_radiobutton}

User complete default service areas page
    Verify the texts on business service areas page
    User clicks NEXT button
    Element Should Be Visible       ${prod_brief_contact_details_headline_label}

User select Yes to add service areas to the profile
    Verify the texts on business service areas page
    Click Element If It Exists          ${prod_brief_servicing_area_show_yes_radiobutton}
    Element Should Be Visible           ${prod_brief_servicing_area_all_nz_radiobutton}
    Page Should Contain                 ${prod_brief_servicing_area_selection_page_text}

User select No to add service areas to the profile
    Click Element If It Exists          ${prod_brief_servicing_area_show_no_radiobutton}

User select all new zealand option and proceed
    Click Element If It Exists          ${prod_brief_servicing_area_all_nz_radiobutton}
    User clicks NEXT button
    Element Should Be Visible           ${prod_brief_contact_details_headline_label}

User select selected regions option and proceed


User select selected regions and trying to proceed without selecting the regions


User add regions "${region}"


User select north island option and proceed
    Click Element If It Exists          ${prod_brief_servicing_area_north_island_radiobutton}

User select south island option and proceed
    Click Element If It Exists          ${prod_brief_servicing_area_south_island_radiobutton}

User select selected towns and cities option and proceed
    Click Element If It Exists          ${prod_brief_servicing_area_towns_cities_radiobutton}

User select towns and cities option and trying to proceed without selecting the town or cities


User add "${city}" in region "${region}"


User select selected suburbs option and proceed


User select selected suburbs option and trying to proceed without selecting the suburbs


User add suburb "${suburb}" in region "${region}" and city "${city}"


User select servicing areas


User complete contact details page
    Verify the texts on business contact details page
    Add contact details
    User clicks NEXT button
    Element Should Be Visible       ${prod_brief_business_categories_headline_label}

Add contact details
    Wait Until Element Is Enabled       ${prod_brief_contact_details_phone_number_inputtext}
    Input Text      ${prod_brief_contact_details_phone_number_inputtext}       08008033
    Input Text      ${prod_brief_contact_details_email_address_inputtext}      testbusinessemail@mailinator.com

User complete business categories page
    Verify the texts on business categories page
    User add business category "Builders"
    User add business category "Concrete"
    User clicks NEXT button
    Sleep    2s

User add business category "${category}"
    Wait Until Element Is Enabled       ${prod_brief_business_categories_dropdown}
    Click Element    ${prod_brief_business_categories_dropdown}
    Click Element    //div[contains(text(),'${category}')]

User complete category sponsorship page
    Verify the texts on business category sponsorship page
    User selects category "Builders" on category sponsorship page
    User selects region "Auckland Region" on category sponsorship page
    User clicks NEXT button
    Element Should Be Visible       ${prod_brief_business_logo_headline_label}

User selects category "${category}" on category sponsorship page
    Wait Until Element Is Enabled       ${prod_brief_category_sponsorship_category_dropdown}
    Click Element If It Exists          ${prod_brief_category_sponsorship_category_dropdown}
    Wait Until Element Is Enabled       xpath=//div[contains(text(),'${category}')]
    Click Element If It Exists          xpath=//div[contains(text(),'${category}')]

User selects region "${region}" on category sponsorship page
    Wait Until Element Is Enabled       ${prod_brief_category_sponsorship_region_dropdown}
    Click Element If It Exists          ${prod_brief_category_sponsorship_region_dropdown}
    Wait Until Element Is Enabled       xpath=//div[contains(text(),'${region}')]
    Click Element If It Exists          xpath=//div[contains(text(),'${region}')]

User complete business logo page
    Verify the texts on business logo page

User complete business logo page with logo skip option
    User skip completing business logo page
    User clicks NEXT button
    Wait Until Element Is Visible       ${prod_brief_business_confirmation_headline_label}

User skip completing business logo page
    Wait Until Element Is Enabled       ${prod_brief_business_logo_skip_radiobutton}
    Verify the texts on business logo page
    Click Element If It Exists          ${prod_brief_business_logo_skip_radiobutton}

User able to confirm the added business info
    User click Done on the Confirmaiton page
    Wait Until Element Is Visible       ${product_brief_thank_you_headline_label}

User click Done on the Confirmaiton page
    Wait Until Element Is Enabled       ${prod_brief_business_confirmation_done_button}
    Verify the texts on business information confirmation page
    User clicks DONE button

User edit the added business info on confirmation page


User change the address phone number and email address and confirm the business info


User change the trading name and business description and confirm the business info


User able to click the manage yellow profile and proceed
    Verify the texts on business thank you page
    Wait Until Element Is Enabled       ${prod_brief_manage_your_profile_button}
    Click Element If It Exists          ${prod_brief_manage_your_profile_button}
    Wait Until Page Contains Element       ${product_brief_account_settings_link}

Verify the texts on business details page
    Page Should Contain         ${prod_brief_business_question_01_text}
    Page Should Contain         ${prod_brief_business_question_02_text}

Verify the texts on business physical address page
    Page Should Contain         ${prod_brief_physical_address_question_01_text}
    Page Should Contain         ${prod_brief_physical_address_statement_01_text}

Verify the texts on business service areas page
    Page Should Contain         ${prod_brief_servicing_area_question_01_text}
    Page Should Contain         ${prod_brief_servicing_area_question_02_text}

Verify the texts on business contact details page
    Page Should Contain         ${prod_brief_contact_details_question_01_text}
    Page Should Contain         ${prod_brief_contact_details_question_02_text}

Verify the texts on business categories page
    Page Should Contain         ${prod_brief_business_categories_question_01_text}

Verify the texts on business category sponsorship page
    Page Should Contain         ${prod_brief_category_sponsorship_question_01_text}
    Page Should Contain         ${prod_brief_category_sponsorship_question_02_text}

Verify the texts on business logo page
    Page Should Contain         ${prod_brief_business_logo_question_01_text}

Verify the texts on business information confirmation page
    Page Should Contain         ${prod_brief_business_confirmation_statement_01_text}

Verify the texts on business thank you page
    Page Should Contain         ${prod_brief_what_happen_next_text}
    Page Should Contain         ${prod_brief_thanks_text}
    Page Should Contain         ${prod_brief_more_info_text}
