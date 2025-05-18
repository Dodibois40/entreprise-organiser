/**
 * Shim (remplacement) des composants de transition React
 * Résout les erreurs de syntaxe et de props dans les composants de transition
 */

import React, { forwardRef } from 'react';

// Implémentation minimale pour les transitions sans dépendances
export const Transition = forwardRef(({ children, in: inProp, timeout, onEnter, onEntering, onEntered, onExit, onExiting, onExited, ...props }, ref) => {
  const [state, setState] = React.useState(inProp ? 'entered' : 'exited');
  
  React.useEffect(() => {
    let timeoutId;
    
    if (inProp && state !== 'entered') {
      if (onEnter) onEnter();
      setState('entering');
      if (onEntering) onEntering();
      
      timeoutId = setTimeout(() => {
        setState('entered');
        if (onEntered) onEntered();
      }, timeout || 300);
    } else if (!inProp && state !== 'exited') {
      if (onExit) onExit();
      setState('exiting');
      if (onExiting) onExiting();
      
      timeoutId = setTimeout(() => {
        setState('exited');
        if (onExited) onExited();
      }, timeout || 300);
    }
    
    return () => clearTimeout(timeoutId);
  }, [inProp, state, timeout, onEnter, onEntering, onEntered, onExit, onExiting, onExited]);
  
  // Rendu sécurisé des enfants
  const renderContent = () => {
    if (!children) return null;
    if (typeof children === 'function') {
      try {
        return children(state);
      } catch (e) {
        console.warn('Erreur lors du rendu de la fonction enfant:', e);
        return null;
      }
    }
    return children;
  };
  
  // Si l'état est 'exited' et prop 'unmountOnExit' est vrai, ne rien rendre
  if (state === 'exited' && props.unmountOnExit) {
    return null;
  }
  
  return (
    <div ref={ref} style={{ transition: `all ${timeout || 300}ms` }}>
      {renderContent()}
    </div>
  );
});

// Implémentation minimale pour TransitionGroup
export const TransitionGroup = forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

// Pour la compatibilité avec le code existant
export const getCustomTransition = () => Transition;
export const CustomTransitionGroup = TransitionGroup;

// Exposer comme module global
if (typeof window !== 'undefined') {
  window.CustomTransition = Transition;
}

console.log('Shim de transition chargé avec succès');
