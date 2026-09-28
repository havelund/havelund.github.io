import React from 'react';
import Layout from '@theme/Layout';
import {useLocation} from '@docusaurus/router';
import MDXContent from '@theme/MDXContent';
export default function MarkdownPage({content:Content}){
 const {title,description}=Content.metadata;
 const path=useLocation().pathname;
 const home=path==='/';
 const committees=['/committees','/talks','/workshops'].includes(path.replace(/\/$/,''));
 const software=path.replace(/\/$/,'')==='/software';
 const research=['/research','/awards'].includes(path.replace(/\/$/,''));
 const books=path.replace(/\/$/,'')==='/books';
 return <Layout title={title} description={description}><article id={home?"about":undefined} className={home?"markdown home-about":committees?"markdown committees-page":software?"markdown software-page":research?"markdown research-page":books?"markdown books-page":"markdown"}><MDXContent><Content components={committees||research?{details:'details',summary:'summary'}:undefined}/></MDXContent></article></Layout>;
}
