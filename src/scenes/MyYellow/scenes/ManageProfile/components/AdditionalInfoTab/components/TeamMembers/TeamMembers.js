import React from 'react';
import * as R from 'ramda';
import Loadable from 'react-loadable';

import {
  ListItem, OptionItem, LabelItem, ActionButton, OptionDetails,
} from '../../../../../../components/ListGroup';
import getIsPremium from '../../../../../../services/getIsPremium';
import formatName from '../../../../../../services/nameFormatter';
import ProductContext from '../../../../../../services/ProductContext';
import peopleIcon from '../../../../../../../../assets/icons/light/people.svg';
import Modal from '../../../../../../../../components/Modal';

import { PremiumIcon } from '../../../PremiumOnly';

const TeamMembersModal = Loadable({
  loader: () => import('./components/TeamMembersModal'),
  loading: () => null,
});

const TeamMembers = () => {
  const productState = React.useContext(ProductContext) || {};
  const [isVisible, setIsVisible] = React.useState(false);
  const isPremium = getIsPremium(productState);
  const teamMembers = R.path(['formData', 'productAttributes', 'employee'])(productState);

  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={peopleIcon}>
            Team Members
            <PremiumIcon />
          </LabelItem>
          <div>
            <ActionButton
              onClick={() => { setIsVisible(true); }}
              variant="link"
              size="sm"
            >Edit
            </ActionButton>
          </div>
        </OptionItem>
        {teamMembers && teamMembers.map((member) => <OptionDetails>{formatName(member)}</OptionDetails>)}
      </ListItem>
      <Modal
        title="Team Members"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        scrollable
      >
        <TeamMembersModal isPremium={isPremium} />
      </Modal>
    </>
  );
};

export default TeamMembers;
