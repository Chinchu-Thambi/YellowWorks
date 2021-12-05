*** Settings ***
Documentation       Yellow Response Management Related Keywords
Variables           customer_response_sitedata.py
Variables           ../registration_login/registration_sitedata.py
Variables           ../staff_assistance/staff_assistance_sitedata.py
Resource            ../helper.robot
Resource            ../registration_login/login_keywords.robot
Resource            ../registration_login/registration_keywords.robot
Resource            ../staff_assistance/staff_assistance_keywords.robot

*** Keywords ***
Customer logs into the customer portal
    WHEN User brings up the navigation panel
        AND User log in using response user credentials
    THEN Login should be successful

Yellow moderator access admin panel and approves the response
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    GIVEN User is on the review admin site
    WHEN User login using moderator user credentials on admin panel
        AND Access the review response tab
        AND Verify the submitted response is available
        AND Access the response
    THEN Accept the response

Response should be visible to consumers on yellow website
    [Timeout]    120s
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    GIVEN User is on yellow website business listing
    THEN Acceptd response is available

Yellow moderator remove the response from the command center
    [Timeout]    120s
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    GIVEN User is on command centre reponse page
    WHEN User login using moderator user credentials on command centre
        AND Delete the response

User clicks the My Products link from the left panel
    Sleep  1s
    Go To Url And Wait For Element    ${TEST_URL}${portal_my_products_link}        ${portal_manage_reviews_button}
    Page Should Contain     ${business_name_label}
    Page Should Contain     ${business_listing_status_label}
    Page Should Contain     ${business_listing_address_label}

User access the manage reviews page
    Sleep   1s
    Click Element And Wait For Another Element      ${portal_manage_reviews_button}         ${reviews_welcome_modal_close_icon}
    Click element       ${reviews_welcome_modal_close_icon}

User clicks the reply button for the first review
    Sleep   1s
    Element Text Should Be      ${portal_manage_reviews_title_label}     ${portal_manage_reviews_title_text}
    Wait Until Element Is Visible       ${portal_reply_button}
    Page Should Contain     ${sample_review_text}
    Click element       ${portal_reply_button}
    Wait Until Element Is Visible       ${portal_response_text_area}

User submits the response
    Input Text      ${portal_response_text_area}        ${sample_response_text}
    Click Element And Wait For Another Element      ${portal_response_submit_button}        ${portal_response_from_the_owner_label}

User should see the submited response with the pending approval label
    Element Should Be Visible     ${portal_pending_approval_label}
    Page Should Contain     ${sample_response_text}
    Sleep   1s

User log in using response user credentials
    Set User    response_customer
    Login response_customer

Login response_customer
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${signin_business_email_text}      ${username_str}
    Enter password      ${signin_business_password_text}      ${password_str}
    Sleep  1s
    Click element and wait for another element    ${signin_navi_login_button}       ${signin_navi_panel_signedin}

User is on the review admin site
    [Timeout]    120s
    Run Keyword If      '${command_executor}' == 'None'     Open Browser    ${reviews_admin_panel_url}    browser=${browser}
    Wait For Page To Load
    Maximize Browser Window

User login using moderator user credentials on admin panel
    Set User    moderator_user
    Login moderator_user on admin panel

Login moderator_user on admin panel
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${reviews_admin_panel_username_textbox}      ${username_str}
    Enter password      ${reviews_admin_panel_password_textbox}      ${password_str}
    Sleep  1s
    Click element and wait for another element    ${reviews_admin_panel_login_button}       ${reviews_admin_panel_response_link}

Access the review response tab
    Click element and wait for another element    ${reviews_admin_panel_response_link}       ${reviews_admin_panel_response_title_label}

Verify the submitted response is available
    Element Text Should Be      ${reviews_admin_panel_response_record}     ${business_name_label}

Access the response
    Click element and wait for another element    ${reviews_admin_panel_response_initial_moderation_button}       ${reviews_admin_panel_response_detailed_record}
    Element Text Should Be      ${reviews_admin_panel_response_detailed_record}     ${business_name_label}
    Wait Until Element Is Visible       ${reviews_admin_panel_response_initial_accept_btn}

Accept the response
    Element Text Should Be      ${reviews_admin_panel_response_detailed_record}     ${business_name_label}
    Click element and wait for another element      ${reviews_admin_panel_response_moderate_accept_button}       ${reviews_admin_panel_channel_dropdown}

User should NOT see the submited response with the pending approval label
    Reload Page
    Wait Until Page Contains        ${sample_response_text}
    Element Should Not Be Visible     ${portal_pending_approval_label}
    Page Should Contain     ${sample_response_text}
    Sleep   1s

User is on yellow website business listing
    Run Keyword If      '${command_executor}' == 'None'     Open Browser    ${yellow_business_listing_url}    browser=${browser}
    Wait For Page To Load
    Maximize Browser Window

Acceptd response is available
    Set Focus To Element        ${yellow_reviews_ratings_label}
    Element Text Should Be      ${yellow_review_text_label}     ${sample_review_text}
    Element Text Should Be      ${yellow_review_response_title_label}     ${yellow_review_response_title_label_text}
    Element Text Should Be      ${yellow_review_response_actual_text_label}     ${sample_response_text}
    Sleep   1s

User is on command centre reponse page
    Run Keyword If      '${command_executor}' == 'None'     Open Browser    ${command_centre_response_url}    browser=${browser}
    Wait For Page To Load
    Maximize Browser Window

User login using moderator user credentials on command centre
    Set User    moderator_user
    Login moderator_user on command centre

Login moderator_user on command centre
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${reviews_command_centre_username_textbox}      ${username_str}
    Enter password      ${reviews_command_centre_password_textbox}      ${password_str}
    Sleep  1s
    Click element and wait for another element    ${reviews_command_centre_login_button}       ${reviews_admin_panel_response_link}

Delete the response
    Element Text Should Be      ${reviews_command_centre_response_link}     ${reviews_command_centre_response_text}
    Click element and wait for another element      ${reviews_command_centre_response_link}       ${reviews_command_centre_response_status_dropdown}
    Click element and wait for another element      ${reviews_command_centre_response_delete_button}       ${reviews_command_centre_response_delete_confirm_button}
    Click element and wait for another element      ${reviews_command_centre_response_delete_confirm_button}        ${reviews_command_centre_response_search_textbox}
    Page Should Contain     ${reviews_command_centre_response_delete_confirmation_text}

Response should NOT be visible to consumers on yellow website
    [Timeout]    120s
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    GIVEN User is on yellow website business listing
    THEN Deleted response is NOT available

Deleted response is NOT available
    Set Focus To Element        ${yellow_reviews_ratings_label}
    Element Text Should Be      ${yellow_review_text_label}     ${sample_review_text}
    Page Should Not Contain Element     ${yellow_review_response_title_label}
    Page Should Not Contain Element     ${yellow_review_response_actual_text_label}
    Sleep   1s

User should NOT see the deleted response on manage reviews
    Reload Page
    Wait Until Page Contains        ${sample_review_text}
    Page Should Not Contain     ${sample_response_text}
    Sleep   1s

User should have recieved an email notification for the approved response
    [Timeout]      240s
    [Teardown]     Run keywords
    ...            Close Browser
    ...            AND    Switch Browser    1
    Open Gmail homepage by a new browser for registration activation code
    Input text    ${gmail_email_id_text}    ${gmail_static_email_address}
    Click element and wait for another element      ${gmail_email_next_button}      ${gmail_password_text}
    Input text    ${gmail_password_text}    ${gmail_static_password}
    Click element and wait for another element      ${gmail_password_next_button}       ${gmail_automation_inbox_1st_mail_entry}
    Sleep   3s
    ${element_present}=     Run Keyword And Return Status       Element Should Be Visible       ${gmail_automation_inbox_1st_mail_entry}
    Run Keyword If      ${element_present}     Click Element      ${gmail_automation_inbox_1st_mail_entry}
    Page Should Contain    ${response_approved_email_topic_label}
    Page Should Contain    ${response_approved_email_body_label}
    Page Should Contain    ${sample_response_text}

Staff logs into the customer portal
    Given User is on the home page
        AND User brings up the navigation panel
    WHEN User perform yellow staff login
        AND Login should be successful
        AND Click select customer link
        AND Staff confirms the business owner email address
        AND Staff confirm the company
    THEN Staff banner and valid content should be visible for the selected company

Staff confirms the business owner email address
    Input Text                                  ${staff_assistance_customer_email_inputtext}     ${business_owner_email_id}
    Wait Until Page Contains Element            ${staff_assistance_company_dropdown}

Staff banner and valid content should be visible for the selected company
    Wait Until Element Contains     ${staff_assistance_company_name_label}          ${business_name_link_text}
    Verify page element text:       ${staff_assistance_email_address_label}         ${business_owner_email_id}
    Verify page element text:       ${staff_assistance_currently_access_label}      ${staff_assistance_header_text_label}