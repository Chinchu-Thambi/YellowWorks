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
Variables         search_ads_buy_journey_sitedata.py
Variables         ../registration_login/login_sitedata.py
Variables         ../registration_login/registration_sitedata.py
Variables         ../registration_login/forgot_password_sitedata.py


*** Keywords ***
User is on searchads page
    Go To Url And Wait For Element    ${TEST_URL}${searchads_profile_link}     ${get_started_button_first}

Verify the searchads page
    Verify Page Element Text:      ${how_does_it_cost}      How much does it cost?
    Page Should Contain Element    ${adjut_your_budget_video}

Click GET STARTED button
    Click Element And Wait For Another Element         ${get_started_button_second}     ${my_full_name_textbox}

Navigate to the onboarding journey for search ads
    Should Be Equal    ${TEST_URL}${search_ad_onboarding_url}      https://sandbox.beta.yellow.co.nz/our-products/search-ads/onboarding/1

User enter all the details
    generate valid business email
    Input Text    ${my_full_name_textbox}         Kumindu Dias
    Input Text    ${business_email_textbox}       ${CUSTOMER_EMAIL}

User selects the consent
    Select Checkbox      ${consent_checkbox}

User click next on business details
    Sleep    2s
    Click Element And Wait For Another Element     ${next_button}    ${my_business_category_header}

User selects the business category
    Click Element    ${business_categories_dropdown}
    Sleep    2s
    Click Element    ${select_business_category}
    Sleep    2s
    Click Element     ${next_button}
    Click Element And Wait For Another Element    ${next_button}    ${select_business_address_dropdown}      # adding it twice as in first attempt it doesn't work Known issue
    Set Global Variable   ${BUSINESS_CATEGORY}     Builders

User selects the business address
    Input Text        ${select_business_address_dropdown}     608 Great South Road Ellerslie,Auckland,New Zealand
    Sleep    2s
    Press Keys        ${select_business_address_dropdown}     ARROW_DOWN+RETURN
    Click Element And Wait For Another Element      ${next_button}       ${unit_no_textbox}
    Input Text        ${unit_no_textbox}     123
    Input Text        ${floor_no_textbox}    2
    Input Text        ${building_textbox}    waterfront
    Click Element And Wait For Another Element      ${next_button}      ${target_region_tooltip}
    Set Global Variable   ${BUSINESS_ADDRESS}     123 / 608 Great South Road, Floor 2, waterfront, Ellerslie, 1051, Auckland, Auckland

User selects the prefered regions for their business
    click Element      ${target_region_tooltip}
    Sleep    2s
    Click Element      ${select_region_dropdown}
    Set Global Variable   ${BUSINESS_REGION}    Waikato

User choose where your ads go
    Sleep    2s
    Click Element      ${later_book_call_radio_button}

User enter a link to your website
    Sleep    2s
    Input Text    ${link_to_your_website}        http://www.yellow.co.nz

User clicks next button
    Sleep    2s
    Click Element         ${next_button}
    Sleep    2s

User navigates to the reccomended Budget page
    Verify Page Element Text:       ${recommended_budget}     Here is your recommended Search Ads budget
    Sleep    2s

User change the recommended budget
    Sleep    2s
    Drag And Drop By Offset         ${select_budget_slider}         200         0
    Sleep    2s

Verify the recommended budget total
    ${temp_slider_value}=     Get Element Attribute     ${select_budget_slider}  aria-valuenow
    Verify Page Element Text:      ${recommended_price_from_dropdown}     ${temp_slider_value}
#    Verify Page Element Text:      ${budget_value_selected}       ${temp_slider_value}
    ${temp_views_per_month}   Get Text     ${views_per_month_value}
    ${temp_leads_per_month}   Get Text     ${leads_per_month_value}
    ${temp_clicks_per_month}  Get Text     ${impressions_per_month_value}
    ${total_budget_value} =   Set Variable   $${temp_slider_value} - Clicks: ${temp_clicks_per_month} - Leads: ${temp_leads_per_month} - Impressions: ${temp_views_per_month} -
    Set Test Variable     ${BUSINESS_BUDGET}   ${total_budget_value}

User enters the phone number
    Input Text        ${phone_number_textbox}    8978675
    Set Global Variable      ${BUSINESS_PHONE}   038978675

User clicks the book a callback
    Click Element And Wait For Another Element     ${book_callback_button}  ${book_call_popup_header}
    Sleep    2s

User provide the phone number and the later time option to receive the call
     User enters the phone number
     ${call_later_count} =   Get Element Count   ${later_book_call_radio_button}
     Run Keyword If   ${call_later_count}>0    Click Element      ${later_book_call_radio_button}
     Click Element      ${select_best_time_dropdown}
     Click Element      ${select_morning_time_menu_item}
     Select Checkbox    ${select_best_days_monday_checkbox}
     Click Element And Wait For Another Element       ${second_book_callback_button}     ${thank_you_msg}
     Sleep    2s

User provide the phone number and the now time option to receive the call
     User enters the phone number
     ${call_later_count} =   Get Element Count   ${now_book_call_radio_button}
     Run Keyword If   ${call_later_count}>0
     ...  Click Element And Wait For Another Element       ${second_book_callback_button}     ${thank_you_msg}
     ...   ELSE
     ...   Run Keywords
     ...        Click Element        ${select_best_time_dropdown}
     ...   AND  Click Element        ${select_morning_time_menu_item}
     ...   AND  Select Checkbox      ${select_best_days_monday_checkbox}
     ...   AND  Click Element And Wait For Another Element       ${second_book_callback_button}     ${thank_you_msg}
     Sleep    2s

User selects the target location radius for their business
    Click Element And Wait For Another Element     ${near_by_business_tab}  ${radius_tootip}
    get the value for targeted location

User click next button on target location
    Click Element And Wait For Another Element         ${next_button}       ${recommended_budget}

User change the targeted location radius
#    Sleep    2s
    Drag And Drop By Offset         ${select_budget_slider}         100         0
    get the value for targeted location
    Sleep    2s

get the value for targeted location
    ${temp_radius_slider_value}=     Get Element Attribute     ${select_budget_slider}  aria-valuenow
    Set Global Variable   ${BUSINESS_RADIUS}     ${temp_radius_slider_value} km

User Sign In as already registered
    User brings up the navigation panel
    User log in using Registered searchads Customer credentials
    Set Global Variable     ${CUSTOMER_EMAIL}     ${username_str}
    Set Global Variable    ${signup_full_name}    ${REGISTERED_USER_NAME}

User Sign In with facebook
    User brings up the navigation panel
    User log in using Facebook credentials
    Set Global Variable     ${CUSTOMER_EMAIL}     ${username_str}
    Set Global Variable    ${signup_full_name}    ${REGISTERED_USER_NAME}

User Sign In with google
    User brings up the navigation panel
    User log in using Google credentials
    Set Global Variable     ${CUSTOMER_EMAIL}     ${username_str}
    Set Global Variable    ${signup_full_name}    ${REGISTERED_USER_NAME}

Verify hubspot contact details
    Sleep   5s
    Contact details captured in hubspot

Verify details in hubspot
    @{ScoreList}=    Create List
    @{ScoreList} =   get_hubspot_deatils_for_searchads    ${CUSTOMER_EMAIL}
    Should Be Equal    @{ScoreList}[0]    ${BUSINESS_CATEGORY}
    Should Be Equal    @{ScoreList}[2]    ${BUSINESS_ADDRESS}
    Should Be Equal    @{ScoreList}[3]    ${BUSINESS_BUDGET}
    Should Be Equal    @{ScoreList}[4]    ${BUSINESS_PHONE}

Verify the region details in hubspot
    @{regionList} =    get_hubspot_deatils_for_searchads    ${CUSTOMER_EMAIL}
    Should Be Equal    @{regionList}[1]    ${BUSINESS_REGION}

Verify the radius details in hubspot
    @{radiusList} =   get_business_radius_for_searchads    ${CUSTOMER_EMAIL}
    ${business_region}=   Set Variable    No Region Selected
    Should Be Equal    @{radiusList}[1]    ${business_region}
    Should Be Equal    @{radiusList}[0]    ${BUSINESS_RADIUS}

User deletes the conatct record in hubspot
      Delete contact record

User verifies the error message for business details page
     Click Element And Wait For Another Element       ${second_book_callback_button}   ${phone_number_error_message}
     Verify Page Element Text:      ${phone_number_error_message}     ${error_msg_text_phone_no}
     ${call_later_count} =   Get Element Count   ${later_book_call_radio_button}
     Run Keyword If   ${call_later_count}>0    Click Element      ${later_book_call_radio_button}
     Click Element And Wait For Another Element       ${second_book_callback_button}   ${phone_number_error_message}
     Verify Page Element Text:      ${phone_number_error_message}     ${error_msg_text_phone_no}
     Verify Page Element Text:      ${preferred_time_error_msg}     ${error_msg_preferred_time_day}

User enter the phone number & time and click book a call button
     User enters the phone number
     Click Element      ${select_best_time_dropdown}
     Click Element      ${select_morning_time_menu_item}
     Select Checkbox    ${select_best_days_monday_checkbox}
     Click Element And Wait For Another Element       ${second_book_callback_button}     ${thank_you_msg}
     Sleep    2s

User clicks Add to cart button
    Click Element And Wait For Another Element   ${sa_add_to_cart_button}   ${sa_checkout_button}
    Click Element And Wait For Another Element   ${sa_checkout_button}    ${signin_navi_login_button}

