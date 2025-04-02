import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRoleById } from '../../../../features/Organization/roleSlice';
import { selectPersonnelByFactory } from '../../../../features/Organization/personnelSlice';
import { selectCurrentFactory } from '../../../../features/Organization/focusFactorySlice';

export const usePersonnelMatching = (node) => {
  const [matchedPersonnel, setMatchedPersonnel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentFactory = useSelector(selectCurrentFactory);
  const role = useSelector(state => selectRoleById(state, node.roleId));
  const availablePersonnel = useSelector(state => 
    selectPersonnelByFactory(state, currentFactory?.id)
  ).filter(person => !node.personnel?.includes(person.id));

  useEffect(() => {
    if (role && availablePersonnel.length > 0) {
      setIsLoading(true);
      // Simulate API call for personnel matching
      const timeoutId = setTimeout(() => {
        const matches = availablePersonnel.map(person => {
          // Calculate skill match
          const skillMatch = role.skills.filter(skill => 
            person.skills.includes(skill)
          ).length;
          const skillScore = (skillMatch / role.skills.length) * 60; // Skills are worth 60% of total score

          // Calculate experience match
          let experienceScore = 0;
          switch (person.experience) {
            case 'Senior':
              experienceScore = 40;
              break;
            case 'Lead':
              experienceScore = 35;
              break;
            case 'Mid-Level':
              experienceScore = 25;
              break;
            case 'Junior':
              experienceScore = 15;
              break;
            case 'Entry Level':
              experienceScore = 10;
              break;
            default:
              experienceScore = 0;
          }

          // Calculate availability score
          let availabilityScore = 0;
          switch (person.availability) {
            case 'Available':
              availabilityScore = 20;
              break;
            case 'Partially Available':
              availabilityScore = 10;
              break;
            default:
              availabilityScore = 0;
          }

          // Calculate total match score
          const totalScore = skillScore + experienceScore + availabilityScore;

          return {
            ...person,
            matchScore: Math.min(Math.round(totalScore), 100),
            skillMatch,
            totalRequiredSkills: role.skills.length
          };
        }).filter(person => person.matchScore > 0)
          .sort((a, b) => b.matchScore - a.matchScore);

        setMatchedPersonnel(matches);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      setMatchedPersonnel([]);
      setIsLoading(false);
    }
  }, [role, availablePersonnel, node.roleId]);

  return {
    matchedPersonnel,
    isLoading,
    hasMatches: matchedPersonnel.length > 0
  };
}; 