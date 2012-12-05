
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

%define tomcat_rel    ${cme.tomcat.version}
%define my_app_rel    ${project.version}

%define my_trigramme       ${cme.trigramme}
%define my_app             ${cme.app}
%define my_appusername     ${cme.username}
%define my_appgroupname    ${cme.groupname}
%define my_appuserid       ${cme.userid}
%define my_appgroupid      ${cme.groupid}

Name: ${project.artifactId}
Version: ${rpm.version}
Release: ${rpm.release}
Summary: CME-Package RPM powered by Apache Tomcat %{tomcat_rel}
Group: Applications/Communications
URL: http://FRPAR-VTC11:10001/cme
Vendor: Valtech
Packager: %{my_appusername}
License: AGPLv1
BuildArch:  ${rpm.build.arch}

#
# Definition de l'arborescence cible
#
%define my_appdir          /opt/%{my_app}
%define my_appdatadir      %{_var}/lib/%{my_app}
%define my_applogdir       %{_var}/log/%{my_app}
%define my_appexec         %{my_appdir}/bin/catalina.sh
%define my_appconfdir      %{my_appdir}/conf
%define my_appconflocaldir %{my_appdir}/conf/Catalina/localhost
%define my_appwebappdir    %{my_appdir}/webapps
%define my_apptempdir      /tmp/%{my_app}
%define my_appworkdir      %{_var}/%{my_app}

%define _initrddir        %{_sysconfdir}/init.d
%define _rundir           %{_var}/run
%define _jvmdir		  /usr/lib/jvm/java-openjdk

BuildRoot: %{_tmppath}/build-%{name}-%{version}-%{release}

#
# Verifie la version Java
#
%if 0%{?suse_version}
Requires:           java = ${cme.java.version}
%endif

%if 0%{?fedora} || 0%{?rhel} || 0%{?centos}
Requires:           java = 1:${cme.java.version}
%endif

#
# Verifie que les commandes systemes groupadd et useradd soient bien disponibles
#
Requires(pre):      %{_sbindir}/groupadd
Requires(pre):      %{_sbindir}/useradd

#
# Definie la liste des fichiers contenu dans le RPM
#
Source0: apache-tomcat-%{tomcat_rel}.tar.gz
Source1: %{my_app}-${project.version}.war
Source2: initd.skel
Source3: sysconfig.skel
Source4: setenv.sh.skel
Source5: logrotate.skel
Source6: server.xml.skel
Source7: limits.conf.skel

%description
MyApp %{my_app_rel} powered by Apache Tomcat %{tomcat_rel}

# -------------------------------------------------------------------------------------------------------------------
#
# Pre-installation (decompression par defaut)
#
# -------------------------------------------------------------------------------------------------------------------
%prep
%setup -q -c

# -------------------------------------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------------------------
%build

# -------------------------------------------------------------------------------------------------------------------
#
# Macro installation
#
# -------------------------------------------------------------------------------------------------------------------
%install
# Prep the install location.
rm -rf $RPM_BUILD_ROOT

mkdir -p $RPM_BUILD_ROOT%{_initrddir}
mkdir -p $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig
mkdir -p $RPM_BUILD_ROOT%{_sysconfdir}/logrotate.d
mkdir -p $RPM_BUILD_ROOT%{_sysconfdir}/security/limits.d

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

# my_app webapp is cme.war (will respond to /cme)
cp %{SOURCE1}  $RPM_BUILD_ROOT%{my_appwebappdir}/%{my_trigramme}.war

# init.d
cp  %{SOURCE2} $RPM_BUILD_ROOT%{_initrddir}/%{my_app}
%{__portsed} 's|@@MY_SYSCONFIGDIR@@|%{_sysconfdir}/sysconfig|g' $RPM_BUILD_ROOT%{_initrddir}/%{my_app}
%{__portsed} 's|@@MYAPP_APP@@|%{my_app}|g' $RPM_BUILD_ROOT%{_initrddir}/%{my_app}
%{__portsed} 's|@@MYAPP_EXEC@@|%{my_appexec}|g' $RPM_BUILD_ROOT%{_initrddir}/%{my_app}

# sysconfig
cp  %{SOURCE3}  $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_APP@@|%{my_app}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_APPDIR@@|%{my_appdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MYAPP_LOGDIR@@|%{my_applogdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MY_JAVA_HOME@@|%{_jvmdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}
%{__portsed} 's|@@MY_RUNDIR@@|%{_rundir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/%{my_app}

# Our custom setenv.sh to get back env variables
cp  %{SOURCE4} $RPM_BUILD_ROOT%{my_appdir}/bin/setenv.sh
%{__portsed} 's|@@MY_SYSCONFIGDIR@@|%{_sysconfdir}/sysconfig|g' $RPM_BUILD_ROOT%{my_appdir}/bin/setenv.sh
%{__portsed} 's|@@MYAPP_APP@@|%{my_app}|g' $RPM_BUILD_ROOT%{my_appdir}/bin/setenv.sh

# Install logrotate
cp %{SOURCE5} $RPM_BUILD_ROOT%{_sysconfdir}/logrotate.d/%{my_app}
%{__portsed} 's|@@MYAPP_LOGDIR@@|%{my_applogdir}|g' $RPM_BUILD_ROOT%{_sysconfdir}/logrotate.d/%{my_app}

# Install server.xml.skel
cp %{SOURCE6} $RPM_BUILD_ROOT%{my_appconfdir}/server.xml.skel

# Setup user limits
cp %{SOURCE7} $RPM_BUILD_ROOT%{_sysconfdir}/security/limits.d/%{my_app}.conf
%{__portsed} 's|@@MYAPP_USER@@|%{my_appusername}|g' $RPM_BUILD_ROOT%{_sysconfdir}/security/limits.d/%{my_app}.conf

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

# -------------------------------------------------------------------------------------------------------------------
#
# Lance la pre-installation
#
# -------------------------------------------------------------------------------------------------------------------
%pre

# First install time, add user and group
if [ "$1" == "1" ]; then
  %{_sbindir}/groupadd -r -g %{my_appgroupid} %{my_appgroupname} 2>/dev/null || :
  %{_sbindir}/useradd -s /sbin/nologin -c "%{my_app} user" -g %{my_appgroupname} -r -d %{my_appdatadir} -u %{my_appuserid} %{my_appusername} 2>/dev/null || :
else
# Update time, stop service if running
  if [ "$1" == "2" ]; then
    if [ -f %{_var}/run/%{my_app}.pid ]; then
      %{_initrddir}/%{my_app} stop
      touch %{my_applogdir}/rpm-update-stop
    fi
    # clean up deployed webapp
    rm -rf %{my_appwebappdir}/%{my_trigramme} 2>/dev/null
    rm -f %{my_appwebappdir}/%{my_trigramme}.war 2>/dev/null
  fi
fi

# -------------------------------------------------------------------------------------------------------------------
#
# Lance apres l'installation
#
# -------------------------------------------------------------------------------------------------------------------
%post

#
# First install time, register service, generate random passwords and start application
#
if [ "$1" == "1" ]; then
  pushd %{my_appdir} >/dev/null
  ln -s %{my_applogdir}  logs
  ln -s %{my_apptempdir} temp
  ln -s %{my_appworkdir} work
  popd >/dev/null

  # start application at first install (uncomment next line this behaviour not expected)
  # %{_initrddir}/%{name} start
else

#
# Update time, restart application if it was running
#
  if [ "$1" == "2" ]; then
    if [ -f %{my_applogdir}/rpm-update-stop ]; then
      # restart application after update (comment next line this behaviour not expected)
      %{_initrddir}/%{name} start
      rm -f %{my_applogdir}/rpm-update-stop
    fi
  fi
fi

# -------------------------------------------------------------------------------------------------------------------
#
# Lance avant la desinstallation de l'application
#
# -------------------------------------------------------------------------------------------------------------------
%preun

#
# Premiere desinstallation
#
if [ "$1" == "0" ]; then
  # Uninstall time, stop service and cleanup

  # stop service
  %{_initrddir}/%{my_app} stop

  # finalize housekeeping
  rm -rf %{my_appdir}
  rm -rf %{my_applogdir}
  rm -rf %{my_apptempdir}
  rm -rf %{my_appworkdir}

fi

# -------------------------------------------------------------------------------------------------------------------
#
# Lance apres la desinstallation de l'application
#
# -------------------------------------------------------------------------------------------------------------------
%postun

# Specific actions in relations with others packages
#%triggerin -- otherapp
# Do something if otherapp is installed

#%triggerun -- otherapp
# Do something if otherapp is uninstalled


# -------------------------------------------------------------------------------------------------------------------
#
# Les droits d'acces et le comportement sur l'ensemble des fichiers
#
# -------------------------------------------------------------------------------------------------------------------
%files
%defattr(-,root,root)
%attr(0755,%{my_appusername},%{my_appgroupname}) %dir %{my_applogdir}
%attr(0755,%{my_appusername},%{my_appgroupname}) %dir %{my_appconflocaldir}
%attr(0755,%{my_appusername},%{my_appgroupname}) %dir %{my_appdatadir}
%attr(0755,%{my_appusername},%{my_appgroupname}) %dir %{my_apptempdir}
%attr(0755,%{my_appusername},%{my_appgroupname}) %dir %{my_appworkdir}
%attr(0755, root,root) %{_initrddir}/%{my_app}
%config(noreplace) %{_sysconfdir}/sysconfig/%{my_app}
%config %{_sysconfdir}/logrotate.d/%{my_app}
%config %{_sysconfdir}/security/limits.d/%{my_app}.conf
%{my_appdir}/bin
%{my_appdir}/conf
%{my_appdir}/lib
%attr(-,%{my_appusername}, %{my_appgroupname}) %{my_appdir}/webapps
%doc %{my_appdir}/NOTICE
%doc %{my_appdir}/RUNNING.txt
%doc %{my_appdir}/LICENSE
%doc %{my_appdir}/RELEASE-NOTES

