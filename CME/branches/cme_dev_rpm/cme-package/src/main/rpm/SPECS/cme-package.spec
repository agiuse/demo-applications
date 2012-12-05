# Avoid unnecessary debug-information (native code)
%define		debug_package %{nil}

# Avoid jar repack (brp-java-repack-jars)
#%define __jar_repack 0

# Avoid CentOS 5/6 extras processes on contents (especially brp-java-repack-jars)
%define __os_install_post %{nil}

%ifos darwin
%define __portsed sed -i "" -e
%else
%define __portsed sed -i
%endif

%define tomcat_rel        ${tomcat.version}
%define my_app_rel    ${project.version}
%define my_trigramme  ${trigramme}
%define my_appusername     ${trigramme}adm

Name: ${project.artifactId}
Version: ${rpm.version}
Release: ${rpm.release}
Summary: CME-Package RPM powered by Apache Tomcat %{tomcat_rel}
Group: Applications/Communications
URL: http://www.mycorp.org/
Vendor: Valtech
Packager: %{my_appusername}
License: AGPLv1
BuildArch:  ${rpm.build.arch}

%define my_app             ${trigramme}-ihm
%define my_appuserid       10000
%define my_appgroupid      10000

%define my_appdir          /opt/%{my_app}
%define my_appdatadir      %{_var}/lib/%{my_app}
%define my_applogdir       %{_var}/log/%{my_app}
%define my_appexec         %{my_appdir}/bin/catalina.sh
%define my_appconfdir      %{my_appdir}/conf
%define my_appconflocaldir %{my_appdir}/conf/Catalina/localhost
%define my_appwebappdir    %{my_appdir}/webapps
%define my_apptempdir      /tmp/%{my_app}
%define my_appworkdir      %{_var}/%{my_app}

%define _systemdir        /lib/systemd/system
%define _initrddir        %{_sysconfdir}/init.d

BuildRoot: %{_tmppath}/build-%{name}-%{version}-%{release}

%if 0%{?suse_version} > 1140
BuildRequires: systemd
%{?systemd_requires}
%endif

%if 0%{?suse_version} <= 1140
%define systemd_requires %{nil}
%endif

%if 0%{?suse_version}
Requires:           java = 1.6.0
%endif

%if 0%{?fedora} || 0%{?rhel} || 0%{?centos}
Requires:           java = 1:1.6.0
%endif

Requires(pre):      %{_sbindir}/groupadd
Requires(pre):      %{_sbindir}/useradd

Source0: apache-tomcat-%{tomcat_rel}.tar.gz
Source1: %{my_app}-${project.version}.war
Source2: initd.skel
Source3: sysconfig.skel
Source4: jmxremote.access.skel
Source5: jmxremote.password.skel
Source6: setenv.sh.skel
Source7: logrotate.skel
Source8: server.xml.skel
Source9: limits.conf.skel
Source10: systemd.skel
Source11: tomcat-catalina-jmx-remote-%{tomcat_rel}.jar

%description
MyApp %{my_app_rel} powered by Apache Tomcat %{tomcat_rel}

%prep
%setup -q -c

%build

%install
# Prep the install location.
rm -rf $RPM_BUILD_ROOT

mkdir -p $RPM_BUILD_ROOT%{_initrddir}
mkdir -p $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig
mkdir -p $RPM_BUILD_ROOT%{_sysconfdir}/logrotate.d
mkdir -p $RPM_BUILD_ROOT%{_sysconfdir}/security/limits.d
mkdir -p $RPM_BUILD_ROOT%{_systemdir}

mkdir -p $RPM_BUILD_ROOT%{my_appdir}
mkdir -p $RPM_BUILD_ROOT%{my_appdatadir}
mkdir -p $RPM_BUILD_ROOT%{my_applogdir}
mkdir -p $RPM_BUILD_ROOT%{my_apptempdir}
mkdir -p $RPM_BUILD_ROOT%{my_appworkdir}
mkdir -p $RPM_BUILD_ROOT%{my_appwebappdir}

# Copy tomcat
mv apache-tomcat-%{tomcat_rel}/* $RPM_BUILD_ROOT%{my_appdir}

# Create conf/Catalina/localhost
mkdir -p $RPM_BUILD_ROOT%{my_appconflocaldir}

# remove default webapps
rm -rf $RPM_BUILD_ROOT%{my_appdir}/webapps/*

# patches to have logs under /var/log/my_app
%{__portsed} 's|\${catalina.base}/logs|%{my_applogdir}|g' $RPM_BUILD_ROOT%{my_appdir}/conf/logging.properties

# my_app webapp is ROOT.war (will respond to /)
cp %{SOURCE1}  $RPM_BUILD_ROOT%{my_appwebappdir}/ROOT.war

# init.d
cp  %{SOURCE2} $RPM_BUILD_ROOT%{_initrddir}/%{my_app}
%{__portsed} 's|@@MYAPP_APP@@|%{my_app}|g' $RPM_BUILD_ROOT%{_initrddir}/%{my_app}
%{__portsed} 's|@@MYAPP_USER@@|%{my_appusername}|g' $RPM_BUILD_ROOT%{_initrddir}/%{my_app}
%{__portsed} 's|@@MYAPP_VERSION@@|version %{version} release %{release}|g' $RPM_BUILD_ROOT%{_initrddir}/%{my_app}
%{__portsed} 's|@@MYAPP_EXEC@@|%{my_appexec}|g' $RPM_BUILD_ROOT%{_initrddir}/%{my_app}

# sysconfig
cp  %{SOURCE3}  $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_APP@@|%{my_app}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_APPDIR@@|%{my_appdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_DATADIR@@|%{my_appdatadir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_LOGDIR@@|%{my_applogdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_USER@@|%{my_appusername}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_CONFDIR@@|%{my_appconfdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}

# JMX (including JMX Remote)
cp %{SOURCE11} $RPM_BUILD_ROOT%{my_appdir}/lib
cp %{SOURCE4}  $RPM_BUILD_ROOT%{my_appconfdir}/jmxremote.access.skel
cp %{SOURCE5}  $RPM_BUILD_ROOT%{my_appconfdir}/jmxremote.password.skel

# Our custom setenv.sh to get back env variables
cp  %{SOURCE6} $RPM_BUILD_ROOT%{my_appdir}/bin/setenv.sh
%{__portsed} 's|@@MYAPP_APP@@|%{my_app}|g' $RPM_BUILD_ROOT%{my_appdir}/bin/setenv.sh

# Install logrotate
cp %{SOURCE7} $RPM_BUILD_ROOT%{_sysconfdir}/logrotate.d/%{my_app}
%{__portsed} 's|@@MYAPP_LOGDIR@@|%{my_applogdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/logrotate.d/%{my_app}

# Install server.xml.skel
cp %{SOURCE8} $RPM_BUILD_ROOT%{my_appconfdir}/server.xml.skel

# Setup user limits
cp %{SOURCE9} $RPM_BUILD_ROOT%{_sysconfdir}/security/limits.d/%{my_app}.conf
%{__portsed} 's|@@MYAPP_USER@@|%{my_appusername}|g' $RPM_BUILD_ROOT%{_sysconfdir}/security/limits.d/%{my_app}.conf

# Setup Systemd
cp %{SOURCE10} $RPM_BUILD_ROOT%{_systemdir}/%{my_app}.service
%{__portsed} 's|@@MYAPP_APP@@|%{my_app}|g' $RPM_BUILD_ROOT%{_systemdir}/%{my_app}.service
%{__portsed} 's|@@MYAPP_EXEC@@|%{my_appexec}|g' $RPM_BUILD_ROOT%{_systemdir}/%{my_app}.service

# remove uneeded file in RPM
rm -f $RPM_BUILD_ROOT%{my_appdir}/*.sh
rm -f $RPM_BUILD_ROOT%{my_appdir}/*.bat
rm -f $RPM_BUILD_ROOT%{my_appdir}/bin/*.bat
rm -rf $RPM_BUILD_ROOT%{my_appdir}/logs
rm -rf $RPM_BUILD_ROOT%{my_appdir}/temp
rm -rf $RPM_BUILD_ROOT%{my_appdir}/work

# ensure shell scripts are executable
chmod 755 $RPM_BUILD_ROOT%{my_appdir}/bin/*.sh

%clean
rm -rf $RPM_BUILD_ROOT

%pre
%if 0%{?suse_version} > 1140
%service_add_pre %{my_app}.service
%endif
# First install time, add user and group
if [ "$1" == "1" ]; then
  %{_sbindir}/groupadd -r -g %{my_appgroupid} %{my_appusername} 2>/dev/null || :
  %{_sbindir}/useradd -s /sbin/nologin -c "%{my_app} user" -g %{my_appusername} -r -d %{my_appdatadir} -u %{my_appuserid} %{my_appusername} 2>/dev/null || :
else
# Update time, stop service if running
  if [ "$1" == "2" ]; then
    if [ -f %{_var}/run/%{my_app}.pid ]; then
      %{_initrddir}/%{my_app} stop
      touch %{my_applogdir}/rpm-update-stop
    fi
    # clean up deployed webapp
    rm -rf %{my_appwebappdir}/ROOT
  fi
fi

%post
%if 0%{?suse_version} > 1140
%service_add_post %{my_app}.service
%endif
# First install time, register service, generate random passwords and start application
if [ "$1" == "1" ]; then
  # register app as service
  systemctl enable %{my_app}.service >/dev/null 2>&1

  # Generated random password for RO and RW accounts
  RANDOMVAL=`echo $RANDOM | md5sum | sed "s| -||g" | tr -d " "`
  sed -i "s|@@MYAPP_RO_PWD@@|$RANDOMVAL|g" %{_sysconfdir}/sysconfig/%{my_app}
  RANDOMVAL=`echo $RANDOM | md5sum | sed "s| -||g" | tr -d " "`
  sed -i "s|@@MYAPP_RW_PWD@@|$RANDOMVAL|g" %{_sysconfdir}/sysconfig/%{my_app}

  pushd %{my_appdir} >/dev/null
  ln -s %{my_applogdir}  logs
  ln -s %{my_apptempdir} temp
  ln -s %{my_appworkdir} work
  popd >/dev/null

  # start application at first install (uncomment next line this behaviour not expected)
  # %{_initrddir}/%{name} start
else
  # Update time, restart application if it was running
  if [ "$1" == "2" ]; then
    if [ -f %{my_applogdir}/rpm-update-stop ]; then
      # restart application after update (comment next line this behaviour not expected)
      %{_initrddir}/%{name} start
      rm -f %{my_applogdir}/rpm-update-stop
    fi
  fi
fi

%preun
%if 0%{?suse_version} > 1140
%service_del_preun %{my_app}.service
%endif
if [ "$1" == "0" ]; then
  # Uninstall time, stop service and cleanup

  # stop service
  %{_initrddir}/%{my_app} stop

  # unregister app from services
  systemctl disable %{my_app}.service >/dev/null 2>&1

  # finalize housekeeping
  rm -rf %{my_appdir}
  rm -rf %{my_applogdir}
  rm -rf %{my_apptempdir}
  rm -rf %{my_appworkdir}

fi

%postun
%if 0%{?suse_version} > 1140
%service_del_postun %{my_app}.service
%endif

# Specific actions in relations with others packages
#%triggerin -- otherapp
# Do something if otherapp is installed

#%triggerun -- otherapp
# Do something if otherapp is uninstalled


%files
%defattr(-,root,root)
%attr(0755,%{my_appusername},%{my_appusername}) %dir %{my_applogdir}
%attr(0755, root,root) %{_initrddir}/%{my_app}
%attr(0644,root,root) %{_systemdir}/%{my_app}.service
%config(noreplace) %{_sysconfdir}/sysconfig/%{my_app}
%config %{_sysconfdir}/logrotate.d/%{my_app}
%config %{_sysconfdir}/security/limits.d/%{my_app}.conf
%{my_appdir}/bin
%{my_appdir}/conf
%{my_appdir}/lib
%attr(-,%{my_appusername}, %{my_appusername}) %{my_appdir}/webapps
%attr(0755,%{my_appusername},%{my_appusername}) %dir %{my_appconflocaldir}
%attr(0755,%{my_appusername},%{my_appusername}) %dir %{my_appdatadir}
%attr(0755,%{my_appusername},%{my_appusername}) %dir %{my_apptempdir}
%attr(0755,%{my_appusername},%{my_appusername}) %dir %{my_appworkdir}
%doc %{my_appdir}/NOTICE
%doc %{my_appdir}/RUNNING.txt
%doc %{my_appdir}/LICENSE
%doc %{my_appdir}/RELEASE-NOTES

