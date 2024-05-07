//  don't open more then one tabs . only open one tabs at a time

  //functionality 

  const [expandedSection, setExpandedSection] = useState(null);
  const toggleSection = (section) => {
    if (expandedSection === section) {
        setExpandedSection(null); // Close the section if it's already open
    } else {
        setExpandedSection(section); // Expand the section
    }
   }

  // jsx code 


  <View style={{ padding: 10 }}>
  <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleSection('consumer')} style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.headerText}>CONSUMER INFO</Text>
              <Icons name={expandedSection === 'consumer' ? "chevron-up" : "chevron-down"} size={20} color="black" />
          </View>
      </TouchableOpacity>
      {expandedSection === 'consumer' && (
          <View style={styles.content}>
              {/* Consumer Info Content */}
          </View>
      )}
  </View>
  {/* Content */}
  <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleSection('content')} style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.headerText}>CONTENT</Text>
              <Icons name={expandedSection === 'content' ? "chevron-up" : "chevron-down"} size={20} color="black" />
          </View>
      </TouchableOpacity>
      {expandedSection === 'content' && (
          <View style={styles.content}>
              <Text >rrrr</Text>
              
          </View>
      )}
  </View>
  {/* sister content */}
  <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleSection('sister')} style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.headerText}>SISTER CONCERN</Text>
              <Icons name={expandedSection === 'sister' ? "chevron-up" : "chevron-down"} size={20} color="black" />
          </View>
      </TouchableOpacity>
      {expandedSection === 'sister' && (
          <View style={styles.content}>
              
                      <Text>gggg</Text>
              
          </View>
      )}
  </View>


  </View>