# -----------------------------------------------------------------------------
# Home Page Sign In Panel
# -----------------------------------------------------------------------------
signin_navi_panel                                               = "xpath=(//button[contains(text(),'Sign in')])[2]"
signin_navi_panel_signedin                                      = "xpath=//*[contains(@aria-haspopup,'menu')]"

# -----------------------------------------------------------------------------
# Sign In Page
# -----------------------------------------------------------------------------
signin_navi_login_button                                        = "xpath=//button[contains(text(),'SIGN IN')]"
signin_navi_createaccount_link                                  = "xpath=//button[contains(text(),'Create Account')]"
signin_business_email_text                                      = "xpath=//*[@id='username']"
signin_business_password_text                                   = "xpath=//*[@id='password']"

# -----------------------------------------------------------------------------
# Staff Sign In Panel
# -----------------------------------------------------------------------------
yellow_email_inputtext                                          = "xpath=//*[@id='i0116']"
yellow_signin_next_button                                       = "xpath=//*[@id='idSIButton9']"
yellow_password_inputtext                                       = "xpath=//*[@id='i0118']"
yellow_signin_button                                            = "xpath=//*[@id='idSIButton9']"
yellow_stay_signin_yes_button                                   = "xpath=//*[@id='idSIButton9']"

# -----------------------------------------------------------------------------
# Signed In Drop Down
# -----------------------------------------------------------------------------
signedin_dropdown_account_settings_option                       = "xpath=//reach-portal/div/div/div[1]/a[contains(@role,'menuitem')]"
signedin_dropdown_my_products_option                            = "xpath=//a[contains(text(),'My products')]"
signedin_dropdown_onboarding_option                             = "xpath=//a[contains(text(),'Onboarding')]"
signedin_dropdown_insights_option                               = "xpath=//reach-portal/div/div/div[3]/a[contains(@role,'menuitem')]"
signedin_dropdown_signout_option                                = "xpath=//reach-portal/div/div/div[4][contains(@role,'menuitem')]"


# -----------------------------------------------------------------------------
# Staff Logged In
# -----------------------------------------------------------------------------
staff_login_customer_email_inputtext                            = "xpath=//div/strong[contains(@data-test,'')]"
staff_login_customer_confirm_button                             = "xpath=//div/a[contains(text(),'Select')]"
#--------------------------------------------------------------------------------
# Welocme Modal
#--------------------------------------------------------------------------------
welcome_modal_close_icon                                        = "xpath=//button[@type='button']/img[@alt='close']"
welcome_modal_Get_started_button                                = "//button[contains(text(),'Get started')]"