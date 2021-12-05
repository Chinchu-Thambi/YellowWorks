*** Settings ***
Documentation       Buy online journey for Print Products
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Suite Teardown      Update Global Test Status
Resource            print_buy_journey_keywords.robot
Resource            ../buy_journey/products_keywords.robot

*** Test Cases ***
TC_PO_001_Verify buy journey for Print-Free Listing for a new customer
    [tags]  codebuild_ready     TC_PO_001
    GIVEN User navigates to Yellow Pages page and initiates the print brief
    WHEN User fills in the print brief info
        AND User selects print Free Listing
        AND User proceeds to payment
    WHEN User sign up
        AND User submits the order for new customer
        AND User navigates to My products page
    THEN Verify my products page profile status is BOOKED

TC_PO_002_Verify buy journey for Print-Enhanced Listing for a new customer
    [tags]  codebuild_ready     TC_PO_002
    GIVEN User navigates to Yellow Pages page and initiates the print brief
    WHEN User fills in the print brief info
        AND User selects print Enhanced Listing
        AND User proceeds to payment
    WHEN User sign up
        AND User submits the order for new customer
        AND User navigates to My products page
    THEN Verify my products page profile status is BOOKED

TC_PO_003_Verify buy journey for Print-3 Line Listing for a new customer
    [tags]  codebuild_ready    TC_PO_003
    GIVEN User navigates to Yellow Pages page and initiates the print brief
    WHEN User fills in the print brief info
        AND User selects print 3 Line Listing
        AND User proceeds to payment
    WHEN User sign up
        AND User submits the order for new customer
        AND User navigates to My products page
    THEN Verify my products page profile status is BOOKED

TC_PO_004_Verify buy journey for Print-4 Line Listing for a new customer
    [tags]  codebuild_ready     TC_PO_004
    GIVEN User navigates to Yellow Pages page and initiates the print brief
    WHEN User fills in the print brief info
        AND User selects print 4 Line Listing
        AND User proceeds to payment
    WHEN User sign up
        AND User submits the order for new customer
        AND User navigates to My products page
    THEN Verify my products page profile status is BOOKED

TC_PO_005_Verify buy journey for Print-5 Line Listing for a new customer
    [tags]  codebuild_ready     TC_PO_005
    GIVEN User navigates to Yellow Pages page and initiates the print brief
    WHEN User fills in the print brief info
        AND User selects print 5 Line Listing
        AND User proceeds to payment
    WHEN User sign up
        AND User submits the order for new customer
        AND User navigates to My products page
    THEN Verify my products page profile status is BOOKED
    
TC_PO_006_Verify buy journey for Free Listing for an existing customer
    [tags]  codebuild_ready     TC_PO_006
    GIVEN User is signed in
        AND User navigates to Yellow Pages page and initiates the print brief
    WHEN User fills in the print brief info
        AND User selects print Free Listing
        AND User proceeds to payment
    WHEN User submits the order for existing customer
        AND User navigates to My products page
    THEN Verify my products page profile status is BOOKED

