# Documentation : https://developers.hubspot.com/docs/overview
import requests
import json
import jsonpath
import os

HUBSPOT_API_KEY = os.environ.get('HUBSPOT_API_KEY')
HUBSPOT_API_URL = os.environ.get('HUBSPOT_API_URL')


class hubspot_api_functions:

    hubkey = os.environ.get('HUBSPOT_API_KEY')
    hubspoturl = os.environ.get('HUBSPOT_API_URL')

    def get_contact_id_using_email(self, email):
        contact_id_hubspot_url = hubspot_api_functions.hubspoturl + "/contacts/v1/contact/email/" + email + "/profile?hapikey=" + hubspot_api_functions.hubkey
        response_contact_id = requests.get(contact_id_hubspot_url)
        json_response_contact_id = json.loads(response_contact_id.text)
        # print(json_response_contactid)
        contact_id_for_email = jsonpath.jsonpath(json_response_contact_id, 'vid')
        #print('contact_id_for_email', repr(contact_id_for_email), 'json_response_contact_id', repr(json_response_contact_id))
        contact_id = contact_id_for_email[0]
        print(contact_id)
        return contact_id

    def get_contact_full_name(self, contact_id):
        full_name_hubspot_url = hubspot_api_functions.hubspoturl + "/contacts/v1/contact/vid/" + contact_id + "/profile?hapikey=" + hubspot_api_functions.hubkey
        response_full_name = requests.get(full_name_hubspot_url)
        json_response_full_name = json.loads(response_full_name.text)
        # print(json_response_full_name)
        first_name_from_full_name = jsonpath.jsonpath(json_response_full_name, 'properties.firstname.value')
        last_name_from_full_name = jsonpath.jsonpath(json_response_full_name, 'properties.lastname.value')
        contact_first_name = first_name_from_full_name[0]
        contact_last_name = last_name_from_full_name[0]
        contact_full_name = contact_first_name + " " + contact_last_name
        print(contact_full_name)
        return contact_full_name

    def get_deal_id_using_contact_id(self, contact_id):
        deal_id_hubspot_url = hubspot_api_functions.hubspoturl + "/crm-associations/v1/associations/" + contact_id + "/HUBSPOT_DEFINED/4?hapikey=" + hubspot_api_functions.hubkey
        response_deal_id = requests.get(deal_id_hubspot_url)
        json_response_deal_id = json.loads(response_deal_id.text)
        # print(json_response_deal_id)
        deal_array_len = (len(json_response_deal_id['results']) - 1)
        print(deal_array_len)
        deal_id = jsonpath.jsonpath(json_response_deal_id, f'results[{deal_array_len}]')
        deal_id_list = list(deal_id)
        print(deal_id_list[0])
        return deal_id_list[0]

    def get_deal_amount_using_deal_id(self, deal_id):
        deal_info_hubspot_url = hubspot_api_functions.hubspoturl + "/deals/v1/deal/" + deal_id + "?hapikey=" + hubspot_api_functions.hubkey
        response_deal_info = requests.get(deal_info_hubspot_url)
        json_response_deal_info = json.loads(response_deal_info.text)
        # print(json_response_deal_info)
        deal_properties = jsonpath.jsonpath(json_response_deal_info, 'properties.amount.value')
        deal_amount_list = list(deal_properties)
        print (int(deal_amount_list[0].replace('.0','')))
        return int(deal_amount_list[0].replace('.0',''))

    def get_company_id_using_contact_id(self, contact_id):
        company_id_hubspot_url = hubspot_api_functions.hubspoturl + "/crm-associations/v1/associations/" + contact_id + "/HUBSPOT_DEFINED/1?hapikey=" + hubspot_api_functions.hubkey
        response_company_id = requests.get(company_id_hubspot_url)
        json_response_company_id = json.loads(response_company_id.text)
        company_id = jsonpath.jsonpath(json_response_company_id, 'results[0]')
        company_id_list = list(company_id)
        print(company_id_list[0])
        return company_id_list[0]

    def get_company_name_using_company_id(self, company_id):
        company_info_hubspot_url = hubspot_api_functions.hubspoturl + "/companies/v2/companies/" + company_id + "?hapikey=" + hubspot_api_functions.hubkey
        response_company_info = requests.get(company_info_hubspot_url)
        json_response_company_info = json.loads(response_company_info.text)
        print(json_response_company_info)
        company_names = jsonpath.jsonpath(json_response_company_info, 'properties.description.value')
        company_names_list = list(company_names)
        print(company_names_list[0])
        return company_names_list[0]

    def delete_contact_using_contact_id(self, contact_id):
        delete_contact_record_hubspot_url = hubspot_api_functions.hubspoturl + "/contacts/v1/contact/vid/" + contact_id + "?hapikey=" + hubspot_api_functions.hubkey
        contact_response = requests.delete(delete_contact_record_hubspot_url)
        return contact_response.status_code

    def delete_company_using_company_id(self, company_id):
        delete_company_record_hubspot_url = hubspot_api_functions.hubspoturl + "/companies/v2/companies/" + company_id + "?hapikey=" + hubspot_api_functions.hubkey
        company_response = requests.delete(delete_company_record_hubspot_url)
        return company_response.status_code

    def delete_deal_using_deal_id(self, deal_id):
        delete_deal_record_hubspot_url = hubspot_api_functions.hubspoturl + "/deals/v1/deal/" + deal_id + "?hapikey=" + hubspot_api_functions.hubkey
        deal_response = requests.delete(delete_deal_record_hubspot_url)
        return deal_response.status_code

    def get_hubspot_deatils_for_searchads(self, email):
        contact_id_hubspot_url = hubspot_api_functions.hubspoturl + "/contacts/v1/contact/email/" + email + "/profile?hapikey=" + hubspot_api_functions.hubkey
        response_contact_id = requests.get(contact_id_hubspot_url)
        json_response_contact_id = json.loads(response_contact_id.text)
        business_category = jsonpath.jsonpath(json_response_contact_id, 'properties.ynz_sem_category.value')
        business_category_name = business_category[0]
        print(business_category_name)
        business_region = jsonpath.jsonpath(json_response_contact_id, 'properties.ynz_sem_regions.value')
        business_region_name = business_region[0]
        print(business_region_name)
        business_address = jsonpath.jsonpath(json_response_contact_id, 'properties.address.value')
        business_address_value = business_address[0]
        print(business_address_value)
        business_Budget = jsonpath.jsonpath(json_response_contact_id, 'properties.ynz_sem_budget.value')
        business_budget_value = business_Budget[0]
        print(business_budget_value)
        business_phone_number = jsonpath.jsonpath(json_response_contact_id, 'properties.phone.value')
        business_phone = business_phone_number[0]
        print(business_phone)
        return business_category_name,business_region_name,business_address_value,business_budget_value,business_phone

    def get_business_radius_for_searchads(self, email):
        contact_id_hubspot_url = hubspot_api_functions.hubspoturl + "/contacts/v1/contact/email/" + email + "/profile?hapikey=" + hubspot_api_functions.hubkey
        response_contact_id = requests.get(contact_id_hubspot_url)
        json_response_contact_id = json.loads(response_contact_id.text)
        business_targeted_radius = jsonpath.jsonpath(json_response_contact_id, 'properties.ynz_sem_radius.value')
        business_radius = business_targeted_radius[0]
        print(business_radius)
        business_region = jsonpath.jsonpath(json_response_contact_id, 'properties.ynz_sem_regions.value')
        business_region_name = business_region[0]
        print(business_region_name)
        return business_radius,business_region_name