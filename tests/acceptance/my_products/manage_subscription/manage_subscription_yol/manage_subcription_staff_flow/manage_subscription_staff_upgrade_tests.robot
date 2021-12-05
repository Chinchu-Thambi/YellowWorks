*** Settings ***
Documentation       Yellow Profile Upgrade Related Test Cases - Staff Flow
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Resource            ../manage_subscription_keywords.robot
Resource            ../../../buy_journey/products_keywords.robot
Resource            ../../../product_brief/product_brief_yol_profile/product_brief_keywords.robot

*** Test Cases ***
TC_STF_UPG_01: Verify Yellow Staff Can Complete The Yellow Profile Upgrade Process
    [Tags]    codebuild_ready    TC_STF_UPG_01
    GIVEN Purchase Yellow Basic profile for Staff
        AND User has completed the product brief process for the Basic+noboost profile
        AND Staff selects the company
    THEN User should not have premium features available
    WHEN User access the Manage Plan page
        AND User verify the info available in Manage Plan Page
        AND Manually run the chatbot to end the trial
        AND Performs upgrade to Yellow Premium+Bronze profile by Staff
    THEN User is displayed with the thank you message
        AND Page is displayed with upgraded amount for Staff
        AND Effective date for upgrade is displayed for Staff
    WHEN User is navigated to manage profile page
    THEN User should now have premium features available
    WHEN User edits the manage profile premium feature
    THEN User should see the change in DLP
