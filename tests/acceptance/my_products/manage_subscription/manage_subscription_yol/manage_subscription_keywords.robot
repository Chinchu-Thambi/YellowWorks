*** Settings ***
Documentation    Suite description
Resource            products_keywords_sbj.robot
Resource            ../../../product_brief/product_brief_yol_profile/product_brief_keywords.robot
Resource            ../../../my_products/manage_profile/manage_profile_yol/manage_profile_keywords.robot
Variables           manage_subscription_sitedata.py
Variables           ../../../manage_profile/manage_profile_yol/manage_profile_sitedata.py
Variables           ../../../staff_assistance/staff_assistance_sitedata.py
Library             DateTime
Library             ../util.py
Library             ../config.py
Library             Dialogs

*** Keywords ***
####################################################################
### Customer Flow Related Keywords                               ###
####################################################################
User submit the credit card payment on manage plan page
    Wait Until Element Is Visible    ${payment_detail_frame_area}
    Add Payment details
    Wait Until Page Contains Element    ${manage_plan_cc_save}
    Click Element   ${manage_plan_cc_save}

Effective date for ${change} is displayed for ${user/staff}
    ${effective_date}=  Run keyword if  '${change}' == 'downgrade' or '${change}' == 'cancellation'     first_day_of_next_month  ELSE  get_todays_date_plus1_calendar_day
    Run Keyword If    '${user/staff}' == 'User'    Verify Page Element text:    ${manage_plan_thankyoubanner_upgrade_effective_date}    Your changes will be effective on ${effective_date}
    ...    ELSE    Verify Page Element text:    ${manage_plan_thankyoubanner_staff_upgrade_effective_date}    Your changes will be effective on ${effective_date}

Manually run the chatbot to end the trial
    Execute Manual Step    ACTIVATE SUBSCRIPTION
    Reload Page

User is navigated to manage profile page
    Click Element    ${manage_profile_LHS}
    Wait Until Page Contains Element    ${manage_profile_tradingname_title}

Staff selects the company
    ${current_url} =  Get Location
    Click Element    ${staff_assistance_select_button}
    Wait until Page Contains Element    ${staff_assistance_company_input}
    Click element    ${staff_assistance_customer_email_inputtext}
    Input text    ${staff_assistance_customer_email_inputtext}    Ytechqa.testaccount@yellow.co.nz
    Wait Until Element Is Visible    ${staff_assistance_company_dropdown}
    Click Element    ${staff_assistance_company_dropdown}
    Click Element    ${manage_plan_specific_staff_select_company}
    Click element      ${staff_assistance_company_select_button}
    Sleep    2s
    Go To    ${current_url}

User should ${available} have premium features available
    Wait Until Keyword Succeeds    1 min    5sec    Verify page contain element:    ${manage_profile_tradingname_title}
    Run Keyword if    "${available}" == "now"    Run Keywords    Verify page contain element:    ${manage_profile_legalbusinessname_title}
    ...    AND    Verify page contain element:    ${manage_profile_legalbusinessname_withcrown_title}
    ...    AND    Scroll to Element to View    ${manage_profile_edityouradditionalinfo_title}
    ...    AND    Verify page contain element:    ${manage_profile_teammembers_title}
    ...    AND    Verify page contain element:     ${manage_profile_teammembers_withcrown_title}
    ...    AND    Verify page contain element:    ${manage_profile_freewifi_title}
    ...    AND    Verify page contain element:     ${manage_profile_freewifi_withcrown_title}
    ...    AND    Verify page contain element:    ${manage_profile_socialmedia_title}
    ...    AND    Verify page contain element:     ${manage_profile_socialmedia_withcrown_title}
    ...    AND    Scroll To Head Of The Page
    ...    AND    Verify page contain element:    ${manage_profile_edityourgallery_title}
    ...    AND    Verify page contain element:    ${manage_profile_edityourgallery_withcrown_title}
    ...    AND    Scroll To Bottom Of The Page
    ...    AND    Verify page contain element:    ${manage_profile_paymentoption_title}
    ...    AND    Verify page contain element:     ${manage_profile_paymentoption_withcrown_title}
    ...    AND    Verify page contain element:    ${manage_profile_bannerimage_title}
    ...    AND    Verify page contain element:     ${manage_profile_bannerimage_withcrown_title}
    ...    AND    Verify page contain element:    ${manage_profile_whatmakesusdiff_title}
    ...    AND    Verify page contain element:     ${manage_profile_whatmakesusdiff_withcrown_title}
    ...    ELSE   Run Keywords    Page Should Contain Element     ${manage_profile_legalbusinessname_title}
    ...    AND    Scroll to Element to View    ${manage_profile_edityouradditionalinfo_title}
    ...    AND    Page Should Contain Element    ${manage_profile_teammembers_title}
    ...    AND    Page Should Contain Element    ${manage_profile_freewifi_title}
    ...    AND    Page Should Contain Element    ${manage_profile_socialmedia_title}
    ...    AND    Scroll To Head Of The Page
    ...    AND    Page Should Contain Element    ${manage_profile_edityourgallery_title}
    ...    AND    Scroll To Bottom Of The Page
    ...    AND    Page Should Contain Element    ${manage_profile_paymentoption_title}
    ...    AND    Page Should Contain Element    ${manage_profile_bannerimage_title}
    ...    AND    Page Should Contain Element    ${manage_profile_whatmakesusdiff_title}
    Scroll To Head Of The Page

User edits the manage profile premium features
    Wait Until Keyword Succeeds    1 min    5sec    Verify page contain element:    ${manage_profile_tradingname_title}
    User edit Trading Name
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    User edit Legal Business Name

User should see the change in DLP
    Wait Until Element Is Not Visible    ${manage_profile_edit_window}
    User navigates to DLP of the profile
    Sleep    4s
    Reload Page
    User validates updated Legal Business Name

####################################################################
### Staff Flow Related Keywords                                  ###
####################################################################
Staff access the my products

User send the updated to the customer

User will display the changes sent to customer to approve message

Customer can complete the order process
####################################################################
### Upgrade Related and Common Keywords                          ###
####################################################################
User has completed the product brief process for the ${profile}+${boost} profile
    GIVEN User clicks set up my product on confirmation page and lands on My Products page
    WHEN User starts onboarding journey
        AND User complete business details page
        AND User complete default physical address on profile page
    AND User select Yes to add service areas to the profile
    AND User select all new zealand option and proceed
    AND User complete contact details page
    AND User complete business categories page
    Sleep    3s
    Run Keyword If  '${boost}' == 'boost'    User complete category sponsorship page
    AND User complete business logo page with logo skip option
    THEN User able to confirm the added business info
    WHEN User able to click the manage yellow profile and proceed
    Wait Until Keyword Succeeds    4 min    10s     Element Should Be Visible       ${manage_profile_view_profile_button}

User access the Manage Plan page
    sleep    3s
    Click Element If It Exists    ${manage_plan_link_LHS}

User verify the info available in Manage Plan Page
    Click Element if It Exists      ${manage_plan_welcome_msg}
    Sleep    3s
    Wait Until Page Contains Element    ${manage_plan_page_thankyou }
    Verify page contain element:    ${manage_plan_page_yournewplan}
    Page Should Contain    Test Business Trading Name
    Page Should Contain    608 Great South Road, Ellerslie, Auckland 1051
    Sleep    2s

Performs ${change} to Yellow ${Profile}+${Boost} profile by ${user/staff}
    Sleep    2s
    Click Element if It Exists      ${manage_plan_welcome_msg}
    Sleep    2s
    Wait Until Element Is Visible    ${manage_plan_page_profile_option}
    Click Element    ${manage_plan_page_profile_option}
    Sleep    1s
    Run Keyword If  '${Profile}' == 'Basic' and '${change}' != 'cancellation'
    ...      Click Element    ${manage_plan_page_profile_option_basic}
    ...      ELSE
    ...      Click Element   ${manage_plan_page_profile_option_premium}
    Sleep    2s
    Scroll to Element to View    ${manage_plan_page_boost_option}
    Wait Until Element Is Visible    ${manage_plan_page_boost_option}
    Click Element    ${manage_plan_page_boost_option}
    Wait Until Element Is Visible    ${manage_plan_profile_option_noboost}
    Run Keyword If  '${change}' == 'cancellation'
    ...          Click Element    ${manage_plan_profile_option_noboost}
    ...      ELSE
    ...          Click Element    ${manage_plan_page_profile_option_bronze}
    Sleep   1s
    Run Keyword If   '${Profile}' == 'Premium' and '${user/staff}' == 'User' and '${change}' != 'cancellation'
    ...          Wait Until Element Is Visible    ${manage_plan_page_total_banner_text}
    ...    ELSE IF  '${Profile}'=='Premium' and '${user/staff}' == 'Staff' and '${change}' != 'cancellation'
    ...          Wait Until Element Is Visible    ${manage_plan_page_staff_total_banner_text}
    Sleep    3s
    Click Element If It Exists    ${manage_plan_submit_button}

User enters the credit card details
    User submit the credit card payment on manage plan page
    Wait Until Page Does Not Contain Element    ${payment_detail_frame_area}
    Wait Until Page Does Not Contain Element    ${manage_plan_submit_success_notification}
    Sleep    3s
    Wait Until Element Is Visible    ${manage_plan_submit_button}
    Click Element    ${manage_plan_submit_button}

User is displayed with the thank you message
    Wait Until Element is Visible     ${manage_plan_page_thankyou}
    Reload page
    Wait Until Element is Visible     ${manage_plan_page_thankyou}

Page is displayed with upgraded amount for ${user/staff}
    Reload Page
    Wait Until Page Contains Element    ${manage_plan_upgrade_amount}
    Run Keyword If    '${user/staff}' == 'User'     Verify page element text:    ${manage_plan_upgrade_amount}   $50.00
    ...    ELSE    Verify page element text:    ${manage_plan_staff_upgrade_amount}   $50.00
