[![Build Status](https://travis-ci.org/SystemRDL/PeakRDL-html.svg?branch=master)](https://travis-ci.org/SystemRDL/PeakRDL-html)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/peakrdl-html.svg)](https://pypi.org/project/peakrdl-html)

# PeakRDL-html
Generate address space documentation HTML from compiled SystemRDL input

## Installing
Install from [PyPi](https://pypi.org/project/peakrdl-html) using pip:

    python3 -m pip install peakrdl-html

## Install from Github using pip
mkdir path_to_folder  
cd path_to_folder  
git clone https://github.com/muneebullashariff/systemrdl-compiler.git  
cd to systemrdl-compiler  
pip install -e .  

Advantages of this approach are:  
1 - You can install package in your home projects directory.  
2 - Package includes .git dir, so it's regular Git repository. You can push to your fork right away.  

## Uninstall   
pip uninstall systemrdl-compiler  

## Example
An example of HTML output generated from a
[fictional SystemRDL register description](example/turboencabulator.rdl).

[https://systemrdl.github.io/PeakRDL-html](https://systemrdl.github.io/PeakRDL-html)


## Usage
Pass the elaborated output of the [SystemRDL Compiler](http://systemrdl-compiler.readthedocs.io)
into the exporter.

Assuming `root` is the elaborated top-level node, or an internal `AddrmapNode`:

```python
from peakrdl.html import HTMLExporter

exporter = HTMLExporter()

exporter.export(root, "path/to/output")
```


## Reference

### `HTMLExporter(**kwargs)`
Constructor for the HTML exporter class

**Optional Parameters**

* `markdown_inst`
    * Override the class instance of the Markdown processor.
      See the [Markdown module](https://python-markdown.github.io/reference/#Markdown)
      for more details.
* `user_template_dir`
    * Path to a directory where user-defined template overrides are stored.
* `user_static_dir`
    * Path to user-defined static content to copy to output directory.
* `user_context`
    * Additional context variables to load into the template namespace.
* `show_signals`
    * Show signal components. Default is False
* `extra_doc_properties`
    * List of properties to explicitly document.

      Nodes that have a property explicitly set will show its value in a table
      in the node's description. Use this to bring forward user-defined
      properties, or other built-in properties in your documentation.

### `HTMLExporter.export(node, output_dir, **kwargs)`
Perform the export!

**Parameters**

* `nodes`
    * Top-level node to export. Can be the top-level `RootNode` or any internal `AddrmapNode`.
      Can also be a list of `RootNode` and any internal `AddrmapNode`.
* `output_dir`
    * HTML output directory.
    
**Optional Parameters**

* `footer`
    * Override footer text.
* `title`
    * Override title text.
* `home_url`
    * If a URL is specified, adds a home button to return to a parent home page.
