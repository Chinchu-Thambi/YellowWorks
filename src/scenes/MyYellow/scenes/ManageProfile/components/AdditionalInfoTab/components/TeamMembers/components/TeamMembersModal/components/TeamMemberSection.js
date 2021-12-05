import React from 'react';
import { Flex } from 'rebass/styled-components';
import PropTypes from 'prop-types';

import { TeamMemberWrapper, Details } from '../TeamMembersModal.styled';
import {
  Form, EmployeeDetail, EmployeeInformation,
} from '../../../../../../modals/Styled';

import Button from '../../../../../../../../../../../components/Button';
import formatName from '../../../../../../../../../services/nameFormatter';

const TeamMemberSection = (props) => {
  const {
    formData, index, onRemove, onEdit, ...rest
  } = props;
  const employeeDetails = formData || {};

  const handleRemoveMember = () => {
    onRemove({
      index,
    });
  };

  const handleEditMember = () => {
    onEdit({
      index,
    });
  };

  return (
    <TeamMemberWrapper>
      <Form
        autoComplete="off"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        <Flex justifyContent="flex-end" alignItems="baseline">
          <Button
            type="button"
            onClick={handleEditMember}
            variant="link"
            size="sm"
          >Edit
          </Button>
          <Button
            type="button"
            onClick={handleRemoveMember}
            variant="link"
            size="sm"
          >Remove
          </Button>
        </Flex>
        <Details>
          <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
            <EmployeeDetail>{formatName(employeeDetails)}</EmployeeDetail>
            <EmployeeDetail p={3}>
              {employeeDetails.telephone
              && `0${employeeDetails.telephone.areaCode} ${employeeDetails.telephone.number} `}
            </EmployeeDetail>
            <EmployeeDetail>{employeeDetails?.email}</EmployeeDetail>
          </Flex>
          <Flex justifyContent="space-between" alignItems="baseline">
            <EmployeeInformation>{employeeDetails?.jobTitle}</EmployeeInformation>
          </Flex>
          <Flex justifyContent="space-between" alignItems="baseline">
            <EmployeeInformation>{employeeDetails?.description}</EmployeeInformation>
          </Flex>
        </Details>
      </Form>
    </TeamMemberWrapper>
  );
};

TeamMemberSection.defaultProps = {
  formData: {
    memberInformation: {
      honorificPrefix: '',
      givenName: '',
      familyName: '',
      honorificSuffix: '',
      description: '',
      jobTitle: '',
      email: '',
      telephone: {},
    },
  },
};

TeamMemberSection.propTypes = {
  formData: PropTypes.shape({
    memberInformation: PropTypes.shape({
      honorificPrefix: PropTypes.string,
      givenName: PropTypes.string,
      familyName: PropTypes.string,
      honorificSuffix: PropTypes.string,
      description: PropTypes.string,
      jobTitle: PropTypes.string,
      email: PropTypes.string,
      telephone: PropTypes.shape({}),
    }),
  }),
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default TeamMemberSection;
