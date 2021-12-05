/* eslint-disable react/prop-types */
import React from 'react';
import {
  faBuilding, faClock, faEnvelope, faMapMarkerAlt, faPhoneAlt, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, ContentWithIcon } from '../Containers';
import { DeleteIconButton, EditIconButton, StarIconButton } from '../IconButtons';

/**
 * @type {(name: string, role: string, description?: string, imageURL?: string, phone?: string, email?: string) => JSX.Element}
 */
const Location = ({
  name, addressLines, email, phone, openingHours, onDelete, onEdit, onToggleAsMain, isMain,
}) => (
  <Card
    iconButtons={[
      <DeleteIconButton onClick={onDelete} />,
      <EditIconButton onClick={onEdit} />,
      <StarIconButton onClick={onToggleAsMain} />,
    ]}
  >
    <div className="flex flex-col space-y-2.5">
      {name && (
        <ContentWithIcon icon={<FontAwesomeIcon icon={faBuilding} />}>
          <span className="font-bold text-lg">{name}</span>
          {isMain && (
            <span className="bg-violet-200 text-violet-600 text-xs uppercase tracking-wider py-1 px-2 rounded-sm ml-3 inline-flex items-center">
              <FontAwesomeIcon icon={faStar} /> <span className="ml-1">main</span>
            </span>
          )}
        </ContentWithIcon>
      )}
      {addressLines && (
        <ContentWithIcon icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}>
          <div>
            {addressLines.map((line, ix) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={ix}>{line}</div>
            ))}
          </div>
        </ContentWithIcon>
      )}
      <div className="flex flex-col space-y-1">
        {email && <ContentWithIcon icon={<FontAwesomeIcon icon={faEnvelope} />}>{email}</ContentWithIcon>}
        {phone && <ContentWithIcon icon={<FontAwesomeIcon icon={faPhoneAlt} />}>{phone}</ContentWithIcon>}
      </div>
      {openingHours && (
        <ContentWithIcon icon={<FontAwesomeIcon icon={faClock} />}>
          <div className="flex flex-col space-y-1">
            <div className="uppercase tracking-wider text-contrast-400 text-xs">Opening hours</div>
            <table>
              {openingHours.map((entry, ix) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={ix}>
                  <td>{entry.days}</td>
                  <td>
                    <span className="ml-3">{entry.hours}</span>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </ContentWithIcon>
      )}
    </div>
  </Card>
);

export default Location;
