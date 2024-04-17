import _mock from './_mock';
// ----------------------------------------------------------------------
export const dataResearch = [
  [
    'We focus on the development of soft actuators and artificial muscle, which can be applied to intra/extra human body robotics, haptic-feedback systems, wearable power suits, and flexible and soft electronics.',
  ],
  ['Multi-responsive soft actuators', 'High bending strain and blocking force'],
  [
    'Design of active electrode materials with enhanced electrochemical properties',
    'Multifunctionalities into the electrode material',
    'Design of novel architectural configuration for soft actuators',
  ],
  [
    'S. Oh, R. Tabassian, P. Thangasamy, M. Mahato, V. H. Nguyen, S. Nam, Z. Huapeng, and I.-K. Oh* ',
    'Cooling-Accelerated Nanowire-Nitinol Hybrid Muscle for Versatile Prosthetic Hand and Biomimetic Retractable Claw ',
    'ADVANCED FUNCTIONAL MATERIALS, Vol. 32, Issue 18 (2022) Selected as inside front cover image ',
    'R. Tabassian†, M. Mahato†, S. Nam, V. H. Nguyen, A. Rajabi-Abhari, and I.-K. Oh* ',
    'Electro-Active and Photo-Active Vanadium Oxide Nanowire Thermo-Hygroscopic Actuators for Kirigami Pop-up ',
    'Advanced Science, Vol. 8, Issue 23 (2021) ',
    'M. Mahato†, R. Tabassian†, V. H. Nguyen, S. Oh, S. Nam, K. J. Kim, and I.-K. Oh* ',
    'Sulfur- and Nitrogen-Rich Porous π-Conjugated COFs as Stable Electrode Materials for Electro-Ionic Soft Actuators ',
    'ADVANCED FUNCTIONAL MATERIALS, Vol. 30, Issue 46 (2020) Selected as front cover image ',
  ],
  [
    'Soft robotics/actuators are promising in the sense that they can control a machine or a system, which is not possible with traditional rigid robots and actuators. Due to their flexibility and compliance, soft actuators can adapt to complex and dynamic environments, which makes them exceptionally advantageous for physical interaction with fragile objects or living organisms. Normally, the soft actuator requires a stimulus control signal and an energy source input. The control signals cause actuators to deform, hence converting the input energies into mechanical motions, which are utilized to operate machines or systems. Stimulants can be electrical or magnetic fields, heat, light, RH, pH, chemicals, hydraulics, pressure, etc. The actuators are usually made of stimuli-responsive materials with diverse mechanisms. For example, ionic electroactive soft actuators, which have a sandwich structure of an electrolyte polymer membrane between two electrodes, bend due to the rearrangement of ions according to external electrical fields. Photoactuators can deform due to several mechanisms, including thermal expansion/contraction, change in humidity adsorption degree, and variation of molecular configuration. Many stimuli-responsive soft actuators are light, flexible, and compliant, and offer high-motion complexity, safety, low noise, small vibration, space-savings, high degree of freedom, and adaptability to changes in the environment, which are remarkable advantages and may allow these actuators to replace rigid counterparts in many devices.',
  ],
];
export const titleResearch = [
  'Nano Generators and Green Energy',
  'Goal',
  'Approach',
  'Selected Publications',
  'What is soft robotics?',
];

export const _researchData = [...Array(titleResearch.length)].map((_, index) => ({
  id: _mock.id(index),
  title: titleResearch[index],
  data: dataResearch[index],
  image: _mock.image.cover(index),
}));
