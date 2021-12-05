*** Settings ***
Documentation       Yellow Profile Insights Related Test Cases
Resource           customer_reports_keywords.robot
Variables          customer_reports_sitedata.py
Suite Setup        Run Keywords
...                Open browser and maximize
Suite Teardown    Close All Browsers


*** Test Cases ***
TC_INST_01: Verify The UI Content On The Yellow Profile Section
    [tags]   TC_INST_01
    Given The customer logs into the portal
    When User navigates to the Insights section and generate the monthly report    November
    Then Verify the basic report content is accurate    November


