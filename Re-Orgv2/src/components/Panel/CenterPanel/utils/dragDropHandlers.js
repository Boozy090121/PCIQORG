export const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

export const handleDragEnter = (event, setIsOver) => {
  event.preventDefault();
  setIsOver(true);
};

export const handleDragLeave = (setIsOver) => {
  setIsOver(false);
};

export const handleRoleDrop = (roleData, node, dispatch, updateNode) => {
  const updatedRoles = node.roles ? [...node.roles] : [];
  if (!updatedRoles.includes(roleData.id)) {
    updatedRoles.push(roleData.id);
    dispatch(updateNode({
      ...node,
      roles: updatedRoles
    }));
  }
};

export const handlePersonnelDrop = (personnelData, node, dispatch, updateNode) => {
  const updatedPersonnel = node.personnel ? [...node.personnel] : [];
  if (!updatedPersonnel.includes(personnelData.id)) {
    updatedPersonnel.push(personnelData.id);
    dispatch(updateNode({
      ...node,
      personnel: updatedPersonnel
    }));
  }
};

export const handleCanvasDrop = (event, dispatch, addNode, factory, phase) => {
  event.preventDefault();
  const data = JSON.parse(event.dataTransfer.getData('application/json'));
  
  if (data.type === 'new-node') {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    dispatch(addNode({
      factory,
      phase,
      node: {
        ...data.node,
        position: { x, y }
      }
    }));
  }
}; 