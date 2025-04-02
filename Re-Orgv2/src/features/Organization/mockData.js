export const mockFactories = [
  {
    id: 'f1',
    name: 'Factory A',
    location: 'East Wing',
    description: 'Main production facility'
  },
  {
    id: 'f2',
    name: 'Factory B',
    location: 'West Wing',
    description: 'Secondary production facility'
  }
];

export const mockRoles = [
  {
    id: 'r1',
    factoryId: 'f1',
    title: 'Plant Manager',
    description: 'Oversees all factory operations',
    parentId: null,
    position: 0,
    department: 'Management'
  },
  {
    id: 'r2',
    factoryId: 'f1',
    title: 'Production Supervisor',
    description: 'Manages production line',
    parentId: 'r1',
    position: 0,
    department: 'Production'
  },
  {
    id: 'r3',
    factoryId: 'f1',
    title: 'Quality Control',
    description: 'Ensures product quality',
    parentId: 'r1',
    position: 1,
    department: 'Quality'
  }
];

export const mockPersonnel = [
  {
    id: 'p1',
    factoryId: 'f1',
    currentRole: 'r1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-0101',
    roleHistory: [
      { roleId: 'r1', date: '2024-01-01T00:00:00.000Z' }
    ]
  },
  {
    id: 'p2',
    factoryId: 'f1',
    currentRole: 'r2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-0102',
    roleHistory: [
      { roleId: 'r2', date: '2024-01-01T00:00:00.000Z' }
    ]
  },
  {
    id: 'p3',
    factoryId: 'f1',
    currentRole: 'r3',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    phone: '555-0103',
    roleHistory: [
      { roleId: 'r3', date: '2024-01-01T00:00:00.000Z' }
    ]
  }
];

export const mockOrgChart = {
  nodes: [
    { id: 'r1', parentId: null, title: 'Plant Manager', personnel: ['p1'] },
    { id: 'r2', parentId: 'r1', title: 'Production Supervisor', personnel: ['p2'] },
    { id: 'r3', parentId: 'r1', title: 'Quality Control', personnel: ['p3'] }
  ],
  edges: [
    { from: 'r1', to: 'r2' },
    { from: 'r1', to: 'r3' }
  ]
}; 