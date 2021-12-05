/* eslint-disable react/prop-types */
import React from 'react';
import { faEnvelope, faPhoneAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteIconButton, EditIconButton } from '../IconButtons';
import { Card, ContentWithIcon } from '../Containers';

/**
 * @type {(name: string, jobTitle: string, description?: string, imageURL?: string, phone?: string, email?: string) => JSX.Element}
 */
const TeamMember = ({
  name, jobTitle, description, imageURL, phone, email, onEdit, onDelete,
}) => (
  <Card iconButtons={[<DeleteIconButton onClick={onDelete} />, <EditIconButton onClick={onEdit} />]}>
    <div className="flex flex-col space-y-2.5 sm:flex-row sm:space-y-0 sm:space-x-2.5">
      <picture className="w-6 min-w-6 h-6 rounded-full overflow-hidden border-3 border-solid border-brand-600 shadow-sm flex items-center justify-center bg-white">
        {imageURL ? (
          <img src={imageURL} alt={`Avatar for team member ${name}`} className="object-cover h-full w-full" />
        ) : (
          <FontAwesomeIcon icon={faUserAlt} size="2x" className="text-contrast-300" />
        )}
      </picture>

      <div className="flex flex-col justify-center space-y-2.5">
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-bold text-contrast-600">{name}</div>
          <div className="tracking-wider uppercase text-sm">{jobTitle}</div>
        </div>
        {description && <div>{description}</div>}
        {(email || phone) && (
          <div className="flex flex-col space-y-2">
            {email && (
              <ContentWithIcon icon={<FontAwesomeIcon icon={faEnvelope} />}>
                <span className="sr-only">Email address</span>
                <div>{email}</div>
              </ContentWithIcon>
            )}
            {phone && (
              <ContentWithIcon icon={<FontAwesomeIcon icon={faPhoneAlt} />}>
                <span className="sr-only">Phone number</span>
                <div>{phone}</div>
              </ContentWithIcon>
            )}
          </div>
        )}
      </div>
    </div>
  </Card>
);

export default TeamMember;
