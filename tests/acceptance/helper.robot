*** Settings ***
Documentation
...               These are helper functions or wrapper keywords that simplifies the operation
...               of the application under test.
Library           SeleniumLibrary    60
Library           String
Library           OperatingSystem
Library           RequestsLibrary
Library           Collections
Library           util.py
Variables         config.py

*** Variables ***
${AWS_CODE_BUID_ID}    %{CODEBUILD_BUILD_ID}    #AWS codebuild job has a environmental variable $CODEBUILD_BUILD_ID

*** Keywords ***
Open browser and maximize
    Close all browsers
    Wait Until Keyword Succeeds    120 s    10 s    Open browser and check
    Wait For Page To Load
    Cancel chrome browser upgrade popup
    Maximize Browser Window
#    ${width}    ${height}=    Get Window Size
#    Run keyword if    ${width}<1600    Set Window Size    1600    ${height}

Go To Url And Wait For Element
    [Arguments]    ${url}    ${element}
    Go To    ${url}
    Execute Javascript    document.documentElement.scrollTop=0    #scroll to top of the page
    Wait Until Keyword Succeeds    ${timeout}    ${polltime}    Wait Until Element Is Visible    ${element}

Cancel chrome browser upgrade popup
    wait until keyword succeeds  4x  2s  Click Element If It Exists     css=#buorgig

#Create Customized Webdriver
#    [Arguments]    ${browser}    ${remote_url}
#    Set Driver Variables    ${browser}    ${remote_url}
#    Create Webdriver    ${DRIVER_NAME}    kwargs=${KWARGS}

Open browser and check
    Open new browser
    Location Should Contain    ${TEST_URL}

Open new browser
    [Timeout]    120s
    Log     command_executor=${command_executor}
    Run Keyword If      '${command_executor}' == 'None'     Open Browser    ${TEST_URL}    browser=${browser}
    Run Keyword Unless  '${command_executor}' == 'None'     Open Browser    ${TEST_URL}    browser=${browser}     remote_url=${command_executor}    desired_capabilities=${desired_capabilities}

Wait For Page To Load
    Wait For Condition    return window.document.readyState == "complete"
    ${pagetitle}    Get Title

Click Element If It Exists
    [Arguments]    ${locator}
    #${status}    ${value}    Run Keyword And Ignore Error    Element Should Be Visible    ${locator}    loglevel=NONE
    #Run Keyword If    '${status}' == 'PASS'    Click Element    ${locator}
    ${status}    Run Keyword And Return Status    Element Should Be Visible    ${locator}    loglevel=NONE
    Run Keyword If    '${status}' == 'True'    Click Element    ${locator}

Click Element And Wait For Another Element
    [Arguments]    ${element1}    ${element2}
	Set Selenium Timeout    240
    Wait Until Keyword Succeeds    ${timeout}    ${polltime}    Wait Until Element Is Visible    ${element1}
    Click Element    ${element1}
    Wait Until Keyword Succeeds    ${timeout}    ${polltime}    Wait Until Element Is Visible    ${element2}

Create Global Variable For Overall Test Result
    Set Global Variable    ${GLOBAL_TEST_STATUS}    "success"    # the global variable indicates the overall test result(success/failure) of all test suites

Update Global Test Status
    ${var_existing}=    Run keyword and return status    Variable Should Exist    ${GLOBAL_TEST_STATUS}
    Run keyword unless    ${var_existing}    Create Global Variable For Overall Test Result    # this keyword should be only called for 1st test suite while the varaible is not created
    ${curr_global_test_status}=    Set Variable    ${GLOBAL_TEST_STATUS}

    ${GLOBAL_TEST_STATUS}=    Set Variable If
    ...    '${SUITE STATUS}'=='FAIL'    "failure"    #  ${SUITE STATUS} is an automatic variable indicates the status of the current test suit
    ...    '${SUITE STATUS}'=='PASS'    ${curr_global_test_status}
    Set Global Variable    ${GLOBAL_TEST_STATUS}
    #Log    ${GLOBAL_TEST_STATUS}

Get S3 Folder Names From Codebuild ID
    [Documentation]    AWS codebuild job has a environmental variable $CODEBUILD_BUILD_ID, which has the build name as the prefix
    ...   echo $CODEBUILD_BUILD_ID
    ...   UI_automation_PoC:922922e2-1f10-45ea-919e-a72bf3672d9f
    ...   return value of this keyword is 922922e2-1f10-45ea-919e-a72bf3672d9f in upper exmaple
    ${length}=    Get Length    ${AWS_CODE_BUID_ID}
    : FOR   ${i}    IN RANGE    0   ${length}
    \   Log     ${AWS_CODE_BUID_ID[${i}]}
    \   Exit for loop if    '${AWS_CODE_BUID_ID[${i}]}'==':'
    ${code_build_id}=    Get Substring    ${AWS_CODE_BUID_ID}    ${i+1}
    ${code_build_task_name}=    Get Substring    ${AWS_CODE_BUID_ID}    0    ${i}
    Log Many    ${code_build_id}    ${code_build_task_name}
    [return]    ${code_build_id.strip()}    ${code_build_task_name.strip()}

Mark LambdaTest Status
   Run keyword if    '${TEST STATUS}'=='PASS'    Execute Javascript    lambda-status=passed
   Run keyword if    '${TEST STATUS}'=='FAIL'    Execute Javascript    lambda-status=failed

Scroll To Bottom Of The Page
    Execute Javascript    window.scrollTo(0,Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,document.documentElement.clientHeight))

Scroll To Head Of The Page
    Execute Javascript    window.scrollTo(0,0)

Scroll to Element
    [Arguments]    ${locator}
    ${y}    Get Vertical Position    ${locator}
    Execute Javascript    window.scrollTo(0,${y})

Scroll to Element to View
    [Arguments]    ${locator}
    Wait until element is visible    ${locator}
    ${y}    Get Vertical Position    ${locator}
    ${y}    Evaluate    ${y} - 380
    Execute Javascript    window.scrollTo(0,${y})

Complete Hubspot log in procedure
    Wait For Page To Load
    Wait Until Page Contains Element        ${hubspot_username_textfield}
    ${pagetitle}    Get Title
    ${status}=    Run keyword and return status    Should contain    ${pagetitle}    ${Hubspot_sign_up}
    Run keyword if    ${status}     Sign in Hubspot by user credentials

Sign in Hubspot by user credentials
    Input Text       ${hubspot_username_textfield}   ${hubspot_username}
    Input Text       ${hubspot_password_textfield}   ${hubspot_password}
    Click Element    ${hubspot_login_button}
    ${testlog}      check_complete_browser_log
    Log     ${testlog}

Navigate to the YOL product page
    Wait until element is visible    ${searchads_yellow_start_here_button}
    Mouse over      ${searchads_yellow_our_products_link}
    Sleep    3s
    Click Element And Wait For Another Element    ${yellow_online_profile}     ${choose_yellow_profile}

Click Element And Wait Page Contains Text
    [Arguments]    ${element}    ${text}
	Set Selenium Timeout    30
    Wait Until Keyword Succeeds    ${timeout}    ${polltime}    Wait Until Element Is Visible    ${element}
    Click Element    ${element}
    Wait Until Page Contains    ${text}    ${timeout}

Notification displayed:
    [Arguments]    ${error_message}
    Wait Until Page Contains    ${error_message}

Get Element Text If It Exists
    [Arguments]    ${locator}
    ${status}    Run Keyword And Return Status    Page Should Contain Element    ${locator}    loglevel=NONE
    ${element_text}    Run Keyword If    '${status}' == 'True'    Get Text    ${locator}
    [Return]    ${element_text}

Verify page contain element:
   [Arguments]    ${element_name}
   Page should contain element    ${element_name}