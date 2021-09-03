introJs().setOptions({
    showBullets: false,
    showProgress: true,
    steps: [{
      title: 'Welcome to Ditto 👋',
      intro: 'Thank you for downloading the app! Let us show you around.'
    },
    {
      title: 'Permissions',
      intro: 'For each application you have open, you will be asked to enable automation permissions. This allows Ditto to open and close your apps.'
    },
    {
      element: document.getElementById('create_new_proj'),
      title: 'Workspaces',
      intro: 'Workspaces are where projectivity is maximized! Create a workspace for your unique workflows and switch between them effortlessly! All open tabs, documents, and applications will be captured.' 
    }]
  }).start();