import React, { forwardRef } from 'react';
import { 
  Button, 
  ActionIcon, 
  UnstyledButton,
  NavLink,
  Badge,
  Tooltip
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Transition, TransitionGroup } from '../../utils/transitionShim.jsx';

// Composant Button avec forwardRef
export const ForwardRefButton = forwardRef((props, ref) => (
  <Button ref={ref} {...props} />
));

// Composant ActionIcon avec forwardRef
export const ActionIconWithRef = forwardRef(({ onClick, children, ...others }, ref) => (
  <ActionIcon ref={ref} onClick={onClick} {...others}>
    {children}
  </ActionIcon>
));

// Composant UnstyledButton avec forwardRef
export const UnstyledButtonWithRef = forwardRef((props, ref) => (
  <UnstyledButton ref={ref} {...props} />
));

// Composant NavLink avec forwardRef
export const NavLinkWithRef = forwardRef((props, ref) => (
  <NavLink ref={ref} {...props} />
));

// Composant Button avec Link
export const LinkButton = forwardRef((props, ref) => (
  <Button ref={ref} component={Link} {...props} />
));

// Composant Badge avec forwardRef
export const BadgeWithRef = forwardRef(({ children, ...props }, ref) => (
  <Badge ref={ref} {...props}>
    {children}
  </Badge>
));

// Solution pour le problème des Tooltips
// Un composant wrapper qui peut recevoir des refs
export const TooltipTarget = forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

// Un composant Tooltip qui utilise TooltipTarget
export const TooltipWithRef = forwardRef(({ children, label, ...tooltipProps }, ref) => (
  <Tooltip label={label} {...tooltipProps}>
    <TooltipTarget ref={ref}>
      {children}
    </TooltipTarget>
  </Tooltip>
));

// Exporter la transition personnalisée pour compatibilité avec le code existant
export const CustomTransition = Transition;

// Composant TransitionGroup personnalisé
export const TransitionGroupWithRef = TransitionGroup;
