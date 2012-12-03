Name: ${project.artifactId}
Version: ${rpm.version}
Release: ${rpm.release}
Summary: CME-Package RPM
License: 2012, Valtech (c)
BuildArch:  ${rpm.build.arch}
Distribution: Valtech
Group: developpement
Packager: CME
autoprov: yes
autoreq: yes
BuildRoot: %{_tmppath}/build-%{name}-%{version}-%{release}

Source0: ${artifactId}-${project.version}.${project.packaging}

%description
CME - Application Hotel - no db

%define my_trigramme	cme
%define my_app             cme-ihm
%define my_appusername     %{my_trigramme}adm
%define myappuserid       10000
%define myappgroupid      10000

%install

%files

%pre

%post
