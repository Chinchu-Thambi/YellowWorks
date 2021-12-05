*** Settings ***
Documentation       Suite description
Variables           customer_reports_sitedata.py
Resource            ../registration_login/login_keywords.robot


*** Keywords ***
The customer logs into the portal
    GIVEN User is on the home page
    WHEN User brings up the navigation panel
        AND User log in using insights user credentials
    THEN Login should be successful

User navigates to the Insights section and generate the monthly report
    [Arguments]    ${month}
    User click on Insights button
    User selects ${month} month

Verify the basic report content is accurate
    [Arguments]    ${month}
    Verify the ${month} month report content

##-----------------------------------------------------------------------------------------------------------##
User log in using insights user credentials
    Set User    insights_user
    Login insights_user

Login insights_user
    ${username}     Get Username
    ${username_str}     Convert To String   ${username}
    Set global variable     ${username_str}
    ${password}     Get Password
    ${password_str}     Convert To String   ${password}
    Enter username      ${signin_business_email_text}      ${username_str}
    Enter password      ${signin_business_password_text}      ${password_str}
    Sleep  1s
    Click element and wait for another element    ${signin_navi_login_button}       ${signin_navi_panel_signedin}

User click on Insights button
    Sleep    1s
#    Wait until page contains    ${insights_button}
    Click element    ${insights_button}

User selects ${month} month
    Sleep    2s
    Click element And Wait For Another Element    ${date_picker}    ${date_picker_november}
    wait until keyword succeeds    5x    1s    Click Element And Wait For Another Element    ${date_picker_november}    ${insights_report_div}

Verify the ${month} month report content
    wait until keyword succeeds    5x    1s    Select Frame     ${insights_iframe}
    wait until keyword succeeds    5x    1s    Select Frame     ${insights_report_iframe}
    Wait until keyword succeeds    7x    1s    Verify page element text:    ${insights_appearances_count}    ${appearance_november}
    Verify page element text:    ${insights_visits_count}    ${visits_november}
    Verify page element text:    ${insights_interactions_count}    ${interactions_november}
    Verify page element text:    ${insights_total_bus_review}    ${bus_review_november}
    Verify page element text:    ${insights_avg_rating}    ${avg_rating_november}
    Unselect Frame