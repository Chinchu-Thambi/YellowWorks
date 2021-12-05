*** Settings ***
Documentation       Yellow Profile Downgrade Related Test Cases - Staff Flow
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Resource            ../manage_subscription_keywords.robot
Resource            ../../../product_brief/product_brief_yol_profile/product_brief_keywords.robot
Resource            ../../../buy_journey/products_keywords.robot

*** Test Cases ***
TC_STF_DWG_01: Verify Yellow Staff Can Complete The Yellow Profile Downgrade Process
    [Tags]    codebuild_ready     TC_STF_DWG_01
   GIVEN Purchase Yellow Premium+Gold profile for Staff
        AND User has completed the product brief process for the Premium+boost profile
        AND Staff selects the company
    WHEN User access the Manage Plan page
       AND User verify the info available in Manage Plan Page
       AND Manually run the chatbot to end the trial
       AND Performs downgrade to Yellow Basic+Bronze profile by Staff
    THEN User is displayed with the thank you message
       AND Effective date for downgrade is displayed for Staff