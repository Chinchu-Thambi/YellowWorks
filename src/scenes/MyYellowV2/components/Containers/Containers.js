/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../../../components/Button';

/**
 * @type {(title: string, subtitle: string) => JSX.Element}
 */
const ContainerTitle = ({ title, subtitle }) => (
  <div className="flex flex-col space-y-1 sm:space-y-2">
    <div className="text-lg font-bold">{title}</div>
    <div className="text-xs text-contrast-300">{subtitle}</div>
  </div>
);

/**
 * @type {(twoColumn?: boolean, primaryAction: Function, secondaryAction: Function, children: any) => JSX.Element}
 */
const Container = ({
  twoColumn = false, primaryAction, secondaryAction, children,
}) => (
  <section className="shadow-md rounded-md overflow-hidden">
    <div
      className={`flex flex-col space-y-2 p-3 sm:p-4 text-contrast-600 ${
        twoColumn && 'sm:flex-row sm:space-y-0 sm:space-x-2'
      }`}
    >
      {children}
    </div>
    {primaryAction && secondaryAction && (
      <div className="bg-base-300 py-3 px-3 sm:px-4 flex justify-end space-x-2">
        <Button size="sm" variant="secondary" onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </Button>
        <Button size="sm" variant="dark" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
      </div>
    )}
  </section>
);

/**
 * @type {(title: string, subtitle: string, actionButton: JSX.Element, children: any) => JSX.Element}
 */
export const OneColumnContainer = ({
  title, subtitle, actionButton, children,
}) => (
  <Container>
    <div className="flex items-start justify-between">
      <ContainerTitle title={title} subtitle={subtitle} />
      {actionButton && <span className="ml-1">{actionButton}</span>}
    </div>
    <div className="flex items-stretch">{children}</div>
  </Container>
);

/**
 * @type {(title: string, subtitle: string, primaryAction: Function, secondaryAction: Function, children: any) => JSX.Element}
 */
export const TwoColumnContainer = ({
  title, subtitle, primaryAction, secondaryAction, children,
}) => (
  <Container twoColumn primaryAction={primaryAction} secondaryAction={secondaryAction}>
    <div className="flex-1">
      <ContainerTitle title={title} subtitle={subtitle} />
    </div>
    <div className="flex items-stretch" style={{ flex: 2 }}>
      {children}
    </div>
  </Container>
);

/**
 * @type {(iconButtons: [], children: any) => JSX.Element}
 */
export const Card = ({ iconButtons, children, ...rest }) => (
  <div
    className={`bg-contrast-100 rounded-md shadow-sm text-contrast-500 w-full h-full flex flex-col sm:flex-row space-y-2.5 sm:space-y-0 sm:space-x-2.5 ${
      iconButtons ? 'py-2 pl-2 pr-1 sm:py-4 sm:pl-4 sm:pr-2.5' : 'p-2 sm:p-4'
    }`}
    {...rest}
  >
    <div className="flex-1">{children}</div>
    {iconButtons && (
      <div className="flex flex-row space-x-2 justify-end sm:flex-col sm:justify-start sm:space-x-0 sm:space-y-2">
        {iconButtons.map((btn, ix) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={ix}>{btn}</span>
        ))}
      </div>
    )}
  </div>
);

/**
 * @type {(icon: JSX.Element, children: any, rest?: any) => JSX.Element}
 */
export const ContentWithIcon = ({ icon, children, ...rest }) => (
  <div className="flex" {...rest}>
    <picture className="text-contrast-300 min-w-4 flex justify-center items-center">{icon}</picture>
    <div>{children}</div>
  </div>
);
