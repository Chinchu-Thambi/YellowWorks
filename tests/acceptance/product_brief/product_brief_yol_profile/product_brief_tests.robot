*** Settings ***
Documentation     Product Brief Flow Related Test Cases
Test Setup        run keywords
...               Open browser and maximize
...               Delete All Cookies
Test Teardown     run keywords
...               Mark LambdaTest Status
...               Close Browser
Suite Teardown    Update Global Test Status
Resource          product_brief_keywords.robot

*** Test Cases ***
TC_PB_001_Verify user can complete the product brief journey WITH physical address showing on the profile
    [Tags]  codebuild_ready   TC_PB_001
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User starts onboarding journey
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User complete default service areas page
        AND User complete contact details page
        AND User complete business categories page
        AND User complete category sponsorship page
        AND User complete business logo page with logo skip option
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_002_Verify user can complete the product brief journey WITHOUT physical address showing on the profile
    [Tags]  codebuild_ready   TC_PB_002
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User select No to show physical address on the profile page
        AND User complete non default physical address on profile page
        AND User complete default service areas page
        AND User complete contact details page
        AND User complete business categories page
        AND User complete category sponsorship page
        AND User complete business logo page with logo skip option
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_003_Verify user can complete the product brief journey WITH physical address and with "ALL NEW ZEALAND" service areas
    [Tags]  codebuild_ready   TC_PB_003
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User select Yes to add service areas to the profile
        AND User select all new zealand option and proceed
        AND User complete contact details page
        AND User complete business categories page
        AND User complete category sponsorship page
        AND User complete business logo page with logo skip option
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_004_Verify user can complete the product brief journey WITHOUT physical address and with "ALL NEW ZEALAND" service areas
    [Tags]  codebuild_ready   TC_PB_004
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User select No to show physical address on the profile page
        AND User complete non default physical address on profile page
        AND User select Yes to add service areas to the profile
        AND User select all new zealand option and proceed
        AND User complete contact details page
        AND User complete business categories page
        AND User complete category sponsorship page
        AND User complete business logo page with logo skip option
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_005_Verify user can complete the product brief journey with "SELECTED REGIONS" service areas
    [Tags]  codebuild_in_progress   TC_PB_005
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User select Yes to show physical address on the profile page
        AND User select Yes to add service areas to the profile
        AND User select selected regions option and proceed
        AND User select selected regions and trying to proceed without selecting the regions
        AND User add regions "${region}"
        AND User add regions "${region}"
        AND User clicks NEXT button
        AND User complete contact details page
        AND User complete business categories page
        AND User skip completing business logo page
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_006_Verify user can complete the product brief journey with "SELECTED TOWNS AND CITIES" service areas
    [Tags]  codebuild_in_progress   TC_PB_006
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User select Yes to show physical address on the profile page
        AND User select Yes to add service areas to the profile
        AND User select selected towns and cities option and proceed
        AND User select towns and cities option and trying to proceed without selecting the town or cities
        AND User add "${city}" in region "${region}"
        AND User add "${city}" in region "${region}"
        AND User clicks NEXT button
        AND User complete contact details page
        AND User complete business categories page
        AND User skip completing business logo page
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_007_Verify user can complete the product brief journey with "SELECTED SUBURBS" service areas
    [Tags]  codebuild_in_progress   TC_PB_007
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User select Yes to show physical address on the profile page
        AND User select Yes to add service areas to the profile
        AND User select selected suburbs option and proceed
        AND User select selected suburbs option and trying to proceed without selecting the suburbs
        AND User add suburb "${suburb}" in region "${region}" and city "${city}"
        AND User add suburb "${suburb}" in region "${region}" and city "${city}"
        AND User clicks NEXT button
        AND User complete contact details page
        AND User complete business categories page
        AND User skip completing business logo page
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_008_Verify user can complete the product brief journey for "NORTH ISLAND" WITH business logo
    [Tags]  codebuild_in_progress   TC_PB_008
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User select Yes to show physical address on the profile page
        AND User select Yes to add service areas to the profile
        AND User select north island option and proceed
        AND User complete contact details page
        AND User complete business categories page
        AND User complete business logo page
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_009_Verify user can complete the product brief journey for "SOUTH ISLAND" WITHOUT business logo
    [Tags]  codebuild_in_progress   TC_PB_009
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User select No to show physical address on the profile page
        AND User select Yes to add service areas to the profile
        AND User select south island option and proceed
        AND User complete contact details page
        AND User complete business categories page
        AND User skip completing business logo page
    THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed

TC_PB_010_Verify user can edit the business details on the confirm your info details screen and complete the product brief journey
    GIVEN User is completed the buy online journey
    WHEN User clicks set up my product on confirmation page and lands on My Products page
        AND User complete business details page
        AND User complete default physical address on profile page
        AND User select Yes to show physical address on the profile page
        AND User select Yes to add service areas to the profile
        AND User select north island option and proceed
        AND User complete contact details page
        AND User complete business categories page
        AND User skip completing business logo page
        AND User edit the added business info on confirmation page
     THEN User able to confirm the added business info
        AND User able to click the manage yellow profile and proceed
