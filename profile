

times in msec
 clock   self+sourced   self:  sourced script
 clock   elapsed:              other lines

000.018  000.018: --- NVIM STARTING ---
000.137  000.119: event init
000.274  000.137: early init
000.749  000.475: locale set
000.821  000.072: init first window
001.236  000.414: inits 1
001.261  000.025: window checked
001.267  000.006: parsing arguments
001.821  000.080  000.080: require('vim.shared')
001.963  000.058  000.058: require('vim._meta')
001.965  000.140  000.083: require('vim._editor')
001.967  000.269  000.049: require('vim._init_packages')
001.971  000.435: init lua interpreter
004.185  002.214: expanding arguments
004.233  000.048: inits 2
004.569  000.336: init highlight
004.571  000.002: waiting for UI
004.756  000.185: done waiting for UI
004.761  000.005: clear screen
004.972  000.211: init default mappings & autocommands
007.118  000.087  000.087: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/ftplugin.vim
007.416  000.038  000.038: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/indent.vim
009.405  000.339  000.339: require('packer.util')
009.442  001.452  001.113: require('packer')
009.840  000.395  000.395: require('packer.log')
010.725  000.323  000.323: require('packer.async')
011.393  000.250  000.250: require('packer.result')
011.397  000.669  000.419: require('packer.jobs')
011.402  001.531  000.540: require('packer.plugin_utils')
011.813  000.383  000.383: require('packer.snapshot')
012.295  004.596  000.834: require('carvalho28.plugins-setup')
012.664  000.365  000.365: require('carvalho28.core.options')
012.817  000.009  000.009: require('vim.keymap')
012.986  000.318  000.309: require('carvalho28.core.keymaps')
014.733  001.151  001.151: require('moonfly')
015.635  002.349  001.198: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/moonfly/colors/moonfly.vim
015.646  002.658  000.309: require('carvalho28.core.colorscheme')
015.993  000.207  000.207: require('Comment')
016.174  000.178  000.178: require('Comment.config')
017.128  000.264  000.264: require('Comment.ft')
017.133  000.673  000.409: require('Comment.utils')
017.373  000.238  000.238: require('Comment.opfunc')
017.555  000.181  000.181: require('Comment.extra')
017.559  001.383  000.292: require('Comment.api')
017.803  002.155  000.388: require('carvalho28.plugins.comment')
020.062  000.585  000.585: require('nvim-tree.notify')
020.067  000.829  000.244: require('nvim-tree.events')
020.857  000.241  000.241: require('nvim-tree.log')
021.533  000.228  000.228: require('nvim-tree.iterators.node-iterator')
021.579  000.719  000.492: require('nvim-tree.utils')
021.908  000.327  000.327: require('nvim-tree.git.utils')
022.243  000.333  000.333: require('nvim-tree.git.runner')
022.557  000.312  000.312: require('nvim-tree.watcher')
022.825  000.265  000.265: require('nvim-tree.explorer.node')
022.830  002.532  000.336: require('nvim-tree.git')
023.071  000.239  000.239: require('nvim-tree.explorer.watch')
023.654  000.325  000.325: require('nvim-tree.explorer.node-builders')
023.972  000.314  000.314: require('nvim-tree.explorer.sorters')
024.299  000.325  000.325: require('nvim-tree.explorer.filters')
025.323  000.698  000.698: require('nvim-tree.view')
025.330  001.028  000.330: require('nvim-tree.live-filter')
025.335  002.254  000.262: require('nvim-tree.explorer.explore')
025.760  000.423  000.423: require('nvim-tree.explorer.reload')
025.764  005.695  000.246: require('nvim-tree.explorer')
025.767  006.727  000.204: require('nvim-tree.core')
026.123  000.355  000.355: require('nvim-tree.diagnostics')
026.588  000.243  000.243: require('nvim-tree.modified')
026.592  000.466  000.224: require('nvim-tree.renderer.components.modified')
026.898  000.303  000.303: require('nvim-tree.renderer.components.padding')
027.268  000.368  000.368: require('nvim-tree.renderer.components.icons')
027.536  000.265  000.265: require('nvim-tree.renderer.components.full-name')
027.801  000.262  000.262: require('nvim-tree.renderer.help')
028.179  000.375  000.375: require('nvim-tree.renderer.components.git')
028.713  000.486  000.486: require('nvim-tree.renderer.builder')
029.025  000.309  000.309: require('nvim-tree.marks')
029.039  010.263  000.346: require('nvim-tree.renderer')
029.050  010.569  000.306: require('nvim-tree.lib')
029.385  000.332  000.332: require('nvim-tree.colors')
031.007  000.229  000.229: require('nvim-tree.actions.finders.find-file')
031.010  000.442  000.213: require('nvim-tree.actions.tree.open')
031.227  000.215  000.215: require('nvim-tree.actions.tree.toggle')
031.456  000.226  000.226: require('nvim-tree.actions.reloaders.reloaders')
031.650  000.191  000.191: require('nvim-tree.actions.root.dir-up')
031.866  000.212  000.212: require('nvim-tree.actions.tree.find-file')
032.099  000.231  000.231: require('nvim-tree.actions.finders.search-node')
032.312  000.211  000.211: require('nvim-tree.actions.tree-modifiers.collapse-all')
032.545  000.231  000.231: require('nvim-tree.actions.tree-modifiers.expand-all')
032.752  000.204  000.204: require('nvim-tree.actions.tree-modifiers.toggles')
033.010  000.254  000.254: require('nvim-tree.actions.fs.create-file')
033.281  000.268  000.268: require('nvim-tree.actions.fs.remove-file')
033.543  000.260  000.260: require('nvim-tree.actions.fs.trash')
033.796  000.250  000.250: require('nvim-tree.actions.fs.rename-file')
034.167  000.366  000.366: require('nvim-tree.actions.fs.copy-paste')
034.421  000.247  000.247: require('nvim-tree.actions.node.file-popup')
034.615  000.192  000.192: require('nvim-tree.actions.node.run-command')
034.843  000.225  000.225: require('nvim-tree.actions.node.system-open')
035.057  000.211  000.211: require('nvim-tree.actions.moves.sibling')
035.267  000.206  000.206: require('nvim-tree.actions.moves.parent')
035.483  000.212  000.212: require('nvim-tree.actions.moves.item')
035.702  000.212  000.212: require('nvim-tree.marks.bulk-move')
036.324  000.390  000.390: require('nvim-tree.actions.node.open-file')
036.329  000.624  000.234: require('nvim-tree.marks.navigation')
036.629  000.298  000.298: require('nvim-tree.keymap')
036.633  006.393  000.404: require('nvim-tree.api')
036.644  006.934  000.541: require('nvim-tree.keymap-legacy')
036.649  007.261  000.327: require('nvim-tree.commands')
036.904  000.254  000.254: require('nvim-tree.actions.root.change-dir')
037.130  000.224  000.224: require('nvim-tree.legacy')
038.416  000.006  000.006: require('vim.F')
038.454  001.315  001.309: require('vim.diagnostic')
038.471  020.552  000.597: require('nvim-tree')
039.209  000.219  000.219: require('nvim-tree.actions')
040.419  001.045  001.045: require('nvim-web-devicons')
042.934  025.129  003.313: require('carvalho28.plugins.nvim-tree')
043.900  000.230  000.230: require('lualine_require')
044.300  001.243  001.013: require('lualine')
044.496  000.192  000.192: require('lualine.themes.moonfly')
050.087  000.183  000.183: require('lualine.utils.mode')
050.464  007.527  005.908: require('carvalho28.plugins.lualine')
051.202  000.329  000.329: require('telescope._extensions')
051.206  000.620  000.291: require('telescope')
054.291  000.387  000.387: require('plenary.bit')
054.540  000.245  000.245: require('plenary.functional')
054.571  000.018  000.018: require('ffi')
054.590  001.491  000.840: require('plenary.path')
054.597  001.877  000.386: require('plenary.strings')
054.847  000.249  000.249: require('telescope.deprecated')
056.105  000.517  000.517: require('plenary.log')
056.152  000.789  000.272: require('telescope.log')
057.349  000.601  000.601: require('plenary.job')
057.629  000.277  000.277: require('telescope.state')
057.637  001.483  000.605: require('telescope.utils')
057.642  002.792  000.521: require('telescope.sorters')
057.724  000.074  000.074: require('vim.inspect')
059.519  007.360  002.368: require('telescope.config')
060.519  000.469  000.469: require('plenary.window.border')
060.771  000.249  000.249: require('plenary.window')
061.011  000.237  000.237: require('plenary.popup.utils')
061.015  001.492  000.536: require('plenary.popup')
061.308  000.292  000.292: require('telescope.pickers.scroller')
061.569  000.257  000.257: require('telescope.actions.state')
061.911  000.307  000.307: require('telescope.actions.utils')
062.699  000.399  000.399: require('telescope.actions.mt')
062.714  000.801  000.402: require('telescope.actions.set')
063.410  000.343  000.343: require('telescope.config.resolve')
063.413  000.697  000.353: require('telescope.pickers.entry_display')
063.651  000.237  000.237: require('telescope.from_entry')
063.850  012.642  001.199: require('telescope.actions')
066.676  000.787  000.787: require('fzf_lib')
066.684  001.266  000.479: require('telescope._extensions.fzf')
066.691  016.225  001.697: require('carvalho28.plugins.telescope')
068.426  000.207  000.207: require('cmp.utils.debug')
069.015  000.288  000.288: require('cmp.utils.char')
069.039  000.609  000.322: require('cmp.utils.str')
069.229  000.188  000.188: require('cmp.utils.pattern')
070.188  000.337  000.337: require('cmp.utils.misc')
070.413  000.221  000.221: require('cmp.utils.buffer')
070.660  000.245  000.245: require('cmp.utils.api')
070.671  001.212  000.409: require('cmp.utils.keymap')
070.676  001.445  000.233: require('cmp.utils.feedkeys')
070.979  000.301  000.301: require('cmp.utils.async')
071.618  000.221  000.221: require('cmp.types.cmp')
071.951  000.331  000.331: require('cmp.types.lsp')
072.164  000.210  000.210: require('cmp.types.vim')
072.167  000.942  000.180: require('cmp.types')
072.380  000.211  000.211: require('cmp.utils.cache')
072.385  001.403  000.251: require('cmp.context')
073.598  000.320  000.320: require('cmp.config.mapping')
074.245  000.390  000.390: require('cmp.config.compare')
074.248  000.646  000.256: require('cmp.config.default')
074.267  001.361  000.395: require('cmp.config')
075.292  000.385  000.385: require('cmp.matcher')
075.299  001.030  000.645: require('cmp.entry')
075.304  002.918  000.527: require('cmp.source')
075.875  000.213  000.213: require('cmp.utils.event')
076.828  000.257  000.257: require('cmp.utils.options')
076.835  000.661  000.404: require('cmp.utils.window')
076.837  000.959  000.298: require('cmp.view.docs_view')
077.657  000.234  000.234: require('cmp.utils.autocmd')
077.667  000.829  000.595: require('cmp.view.custom_entries_view')
078.169  000.500  000.500: require('cmp.view.wildmenu_entries_view')
078.590  000.418  000.418: require('cmp.view.native_entries_view')
078.894  000.301  000.301: require('cmp.view.ghost_text_view')
078.914  003.608  000.389: require('cmp.view')
079.149  011.556  000.875: require('cmp.core')
079.561  000.192  000.192: require('cmp.config.sources')
079.754  000.189  000.189: require('cmp.config.window')
079.843  012.687  000.749: require('cmp')
081.579  000.164  000.164: require('luasnip.session')
081.587  000.659  000.496: require('luasnip.util.util')
081.882  000.294  000.294: require('luasnip.session.snippet_collection')
082.559  000.429  000.429: require('luasnip.util._builtin_vars')
082.712  000.826  000.398: require('luasnip.util.environ')
082.897  000.182  000.182: require('luasnip.util.extend_decorator')
083.284  000.157  000.157: require('luasnip.loaders._caches')
083.524  000.238  000.238: require('luasnip.util.path')
083.537  000.638  000.243: require('luasnip.loaders')
083.800  000.257  000.257: require('luasnip.util.log')
084.284  000.151  000.151: require('luasnip.util.types')
084.494  000.208  000.208: require('luasnip.util.ext_opts')
084.677  000.181  000.181: require('luasnip.extras.filetype_functions')
084.970  001.159  000.619: require('luasnip.config')
084.974  005.129  001.114: require('luasnip')
085.217  000.242  000.242: require('lspkind')
085.784  000.249  000.249: require('luasnip.loaders.util')
087.520  000.232  000.232: require('luasnip.nodes.util')
087.672  000.149  000.149: require('luasnip.util.events')
087.681  000.741  000.360: require('luasnip.nodes.node')
087.983  000.301  000.301: require('luasnip.nodes.insertNode')
088.170  000.184  000.184: require('luasnip.nodes.textNode')
088.395  000.222  000.222: require('luasnip.util.mark')
088.594  000.197  000.197: require('luasnip.util.pattern_tokenizer')
088.766  000.169  000.169: require('luasnip.util.dict')
088.862  002.679  000.865: require('luasnip.nodes.snippet')
089.726  000.223  000.223: require('luasnip.util.parser.neovim_ast')
089.940  000.211  000.211: require('luasnip.util.str')
090.741  000.208  000.208: require('luasnip.util.directed_graph')
090.746  001.575  000.933: require('luasnip.util.parser.ast_utils')
090.984  000.236  000.236: require('luasnip.nodes.functionNode')
091.341  000.354  000.354: require('luasnip.nodes.choiceNode')
091.669  000.326  000.326: require('luasnip.nodes.dynamicNode')
091.841  000.169  000.169: require('luasnip.util.functions')
091.847  002.982  000.322: require('luasnip.util.parser.ast_parser')
092.210  000.362  000.362: require('luasnip.util.parser.neovim_parser')
092.216  006.245  000.222: require('luasnip.util.parser')
092.247  006.460  000.214: require('luasnip.nodes.snippetProxy')
092.680  000.429  000.429: require('luasnip.util.jsonc')
092.686  007.466  000.328: require('luasnip/loaders/from_vscode')
104.831  038.138  012.615: require('carvalho28.plugins.nvim-cmp')
105.483  000.281  000.281: require('mason-core.path')
106.165  000.308  000.308: require('mason-core.functional')
106.602  000.167  000.167: require('mason-core.functional.data')
106.610  000.416  000.248: require('mason-core.functional.function')
106.795  000.172  000.172: require('mason-core.functional.relation')
106.989  000.188  000.188: require('mason-core.functional.logic')
107.021  001.535  000.452: require('mason-core.platform')
107.248  000.225  000.225: require('mason.settings')
107.251  002.254  000.214: require('mason')
107.880  000.325  000.325: require('mason-core.log')
107.884  000.631  000.306: require('mason-lspconfig')
108.157  000.271  000.271: require('mason-null-ls')
108.805  000.311  000.311: require('mason-core.functional.list')
109.034  000.224  000.224: require('mason-core.functional.string')
109.069  000.897  000.362: require('mason.api.command')
109.306  000.231  000.231: require('mason-registry.sources')
109.475  000.154  000.154: require('mason-lspconfig.settings')
109.727  000.215  000.215: require('mason-lspconfig.lspconfig_hook')
113.104  000.406  000.406: require('vim.lsp.log')
114.037  000.930  000.930: require('vim.lsp.protocol')
116.204  000.586  000.586: require('vim.lsp._snippet')
116.513  000.306  000.306: require('vim.highlight')
116.536  002.495  001.604: require('vim.lsp.util')
116.565  004.651  000.820: require('vim.lsp.handlers')
117.490  000.923  000.923: require('vim.lsp.rpc')
117.928  000.433  000.433: require('vim.lsp.sync')
118.649  000.718  000.718: require('vim.lsp.semantic_tokens')
119.485  000.832  000.832: require('vim.lsp.buf')
119.923  000.435  000.435: require('vim.lsp.diagnostic')
120.452  000.526  000.526: require('vim.lsp.codelens')
120.525  010.238  001.720: require('vim.lsp')
120.590  010.860  000.622: require('lspconfig.util')
121.169  000.260  000.260: require('mason-core.functional.table')
121.228  000.636  000.376: require('mason-lspconfig.mappings.server')
121.771  000.206  000.206: require('mason-core.EventEmitter')
122.001  000.228  000.228: require('mason-core.optional')
122.644  000.367  000.367: require('mason-core.async')
122.816  000.169  000.169: require('mason-core.async.uv')
122.828  000.824  000.287: require('mason-core.fs')
122.855  001.625  000.367: require('mason-registry')
123.014  000.157  000.157: require('mason-lspconfig.server_config_extensions')
123.441  000.424  000.424: require('lspconfig.configs')
123.685  000.241  000.241: require('lspconfig.server_configurations.omnisharp')
124.115  000.156  000.156: require('mason-core.notify')
124.120  000.355  000.199: require('mason-lspconfig.ensure_installed')
124.320  000.193  000.193: require('mason-registry.sources.lua')
125.645  000.272  000.272: require('mason-core.result')
125.738  000.704  000.432: require('mason-core.purl')
125.756  001.117  000.412: require('mason-core.package')
126.585  000.366  000.366: require('mason-core.process')
126.955  000.368  000.368: require('mason-core.spawn')
126.961  000.934  000.200: require('mason-core.managers.powershell')
126.999  001.241  000.308: require('mason-core.fetch')
127.220  000.219  000.219: require('mason-core.providers')
128.426  000.314  000.314: require('mason-core.installer.registry.expr')
128.454  000.922  000.608: require('mason-core.installer.registry.link')
128.505  001.282  000.360: require('mason-core.installer.registry')
128.537  004.213  000.354: require('mason-registry.sources.github')
133.821  000.184  000.184: require('mason-registry.index')
135.259  000.234  000.234: require('mason-core.functional.number')
135.351  000.809  000.575: require('mason-lspconfig.api.command')
135.572  000.218  000.218: require('mason-null-ls.settings')
135.901  000.275  000.275: require('mason-null-ls.ensure_installed')
136.500  000.266  000.266: require('mason-null-ls.automatic_installation')
137.536  000.334  000.334: require('null-ls.utils')
137.562  000.605  000.271: require('null-ls.config')
137.565  000.845  000.240: require('null-ls.logger')
137.568  001.066  000.221: require('null-ls.builtins')
137.871  000.289  000.289: require('mason-null-ls.api.command')
137.874  033.038  006.572: require('carvalho28.plugins.lsp.mason')
138.189  000.210  000.210: require('lspsaga')
138.622  000.199  000.199: require('lspsaga.highlight')
139.002  000.226  000.226: require('lspsaga.lspkind')
140.466  000.272  000.272: require('lspsaga.lightbulb')
141.267  000.369  000.369: require('lspsaga.libs')
141.273  000.783  000.414: require('lspsaga.symbolwinbar')
141.284  003.409  001.718: require('carvalho28.plugins.lsp.lspsaga')
141.652  000.207  000.207: require('lspconfig')
142.026  000.187  000.187: require('cmp_nvim_lsp.source')
142.029  000.375  000.187: require('cmp_nvim_lsp')
142.479  000.224  000.224: require('typescript.config')
143.605  000.201  000.201: require('typescript.types.methods')
143.816  000.209  000.209: require('typescript.utils')
143.818  000.636  000.226: require('typescript.execute-command')
144.016  000.196  000.196: require('typescript.types.workspace-commands')
144.019  001.067  000.236: require('typescript.go-to-source-definition')
144.372  000.352  000.352: require('typescript.rename-file')
144.638  000.264  000.264: require('typescript.source-actions')
144.641  001.926  000.243: require('typescript.commands')
144.858  000.215  000.215: require('typescript.handlers')
145.068  000.205  000.205: require('lspconfig.server_configurations.tsserver')
145.177  002.696  000.350: require('typescript.lsp')
145.181  003.150  000.230: require('typescript')
145.405  000.201  000.201: require('lspconfig.server_configurations.html')
146.834  000.205  000.205: require('lspconfig.server_configurations.cssls')
147.563  000.233  000.233: require('lspconfig.server_configurations.tailwindcss')
148.224  000.195  000.195: require('lspconfig.server_configurations.emmet_ls')
148.773  000.212  000.212: require('lspconfig.server_configurations.lua_ls')
149.228  007.942  003.165: require('carvalho28.plugins.lsp.lspconfig')
149.881  000.167  000.167: require('null-ls.helpers.cache')
150.165  000.282  000.282: require('null-ls.helpers.diagnostics')
150.335  000.167  000.167: require('null-ls.helpers.formatter_factory')
150.910  000.220  000.220: require('null-ls.state')
150.914  000.577  000.357: require('null-ls.helpers.generator_factory')
151.350  000.213  000.213: require('null-ls.helpers.command_resolver')
151.353  000.438  000.225: require('null-ls.helpers.make_builtin')
151.550  000.195  000.195: require('null-ls.helpers.range_formatting_args_factory')
151.552  001.997  000.171: require('null-ls.helpers')
152.488  000.287  000.287: require('null-ls.methods')
152.494  000.583  000.297: require('null-ls.diagnostics')
152.500  000.946  000.362: require('null-ls.sources')
152.503  003.143  000.201: require('null-ls')
152.794  000.285  000.285: require('null-ls.builtins.formatting.prettier')
152.997  000.198  000.198: require('null-ls.builtins.formatting.stylua')
153.396  000.233  000.233: require('null-ls.builtins.diagnostics.eslint')
153.436  000.435  000.203: require('null-ls.builtins.diagnostics.eslint_d')
154.128  000.328  000.328: require('null-ls.client')
154.178  004.947  000.557: require('carvalho28.plugins.lsp.null-ls')
155.029  000.176  000.176: require('nvim-autopairs._log')
155.312  000.281  000.281: require('nvim-autopairs.utils')
156.154  000.343  000.343: require('nvim-autopairs.conds')
156.160  000.621  000.278: require('nvim-autopairs.rule')
156.162  000.847  000.226: require('nvim-autopairs.rules.basic')
156.169  001.874  000.569: require('nvim-autopairs')
159.866  000.273  000.273: require('vim.treesitter.language')
159.875  000.806  000.533: require('vim.treesitter.query')
160.148  000.272  000.272: require('vim.treesitter._range')
160.155  001.677  000.599: require('vim.treesitter.languagetree')
160.161  002.151  000.474: require('vim.treesitter')
160.499  003.288  001.137: require('nvim-treesitter.parsers')
160.815  000.313  000.313: require('nvim-treesitter.utils')
160.822  004.051  000.450: require('nvim-treesitter.ts_utils')
160.828  004.319  000.268: require('nvim-autopairs.ts-conds')
160.830  004.506  000.187: require('nvim-autopairs.rules.ts_basic')
161.232  000.401  000.401: require('vim.treesitter.highlighter')
162.032  000.221  000.221: require('nvim-autopairs.completion.handlers')
162.050  000.470  000.250: require('nvim-autopairs.completion.cmp')
162.061  007.881  000.630: require('carvalho28.plugins.autopairs')
163.281  000.185  000.185: require('nvim-treesitter.compat')
163.554  000.271  000.271: require('nvim-treesitter.tsrange')
163.756  000.199  000.199: require('nvim-treesitter.caching')
163.767  001.093  000.439: require('nvim-treesitter.query')
163.779  001.611  000.517: require('nvim-treesitter.configs')
164.725  000.281  000.281: require('nvim-treesitter.info')
165.066  000.338  000.338: require('nvim-treesitter.shell_command_selectors')
165.099  001.314  000.694: require('nvim-treesitter.install')
168.384  006.321  003.397: require('carvalho28.plugins.treesitter')
168.887  000.197  000.197: require('gitsigns.async')
169.346  000.114  000.114: require('gitsigns.message')
169.357  000.467  000.353: require('gitsigns.config')
169.526  000.167  000.167: require('gitsigns.debug.log')
169.743  000.215  000.215: require('gitsigns.uv')
169.750  001.274  000.227: require('gitsigns')
170.326  001.940  000.666: require('carvalho28.plugins.gitsigns')
170.329  162.670  000.083: sourcing /Users/carvalho28/.config/nvim/init.lua
170.337  002.570: sourcing vimrc file(s)
171.243  000.541  000.541: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/filetype.lua
171.716  000.089  000.089: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/syntax/synload.vim
171.860  000.487  000.398: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/syntax/syntax.vim
174.152  000.139  000.139: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/gzip.vim
174.224  000.010  000.010: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/health.vim
175.109  000.150  000.150: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/pack/dist/opt/matchit/plugin/matchit.vim
175.278  000.997  000.848: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/matchit.vim
175.475  000.132  000.132: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/matchparen.vim
175.556  000.016  000.016: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/netrwPlugin.vim
175.803  000.010  000.010: sourcing /Users/carvalho28/.local/share/nvim/rplugin.vim
175.811  000.194  000.185: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/rplugin.vim
175.927  000.059  000.059: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/shada.vim
176.016  000.020  000.020: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/spellfile.vim
176.172  000.090  000.090: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/tarPlugin.vim
176.399  000.154  000.154: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/tohtml.vim
176.487  000.016  000.016: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/tutor.vim
176.715  000.130  000.130: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/zipPlugin.vim
181.315  000.207  000.207: require('nvim-treesitter.statusline')
181.618  000.301  000.301: require('nvim-treesitter.query_predicates')
181.622  002.954  002.446: require('nvim-treesitter')
181.919  003.302  000.349: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/nvim-treesitter/plugin/nvim-treesitter.lua
186.413  000.217  000.217: require('nvim-ts-autotag._log')
186.665  000.249  000.249: require('nvim-ts-autotag.utils')
186.676  001.048  000.581: require('nvim-ts-autotag.internal')
186.678  003.801  002.753: require('nvim-ts-autotag')
186.719  003.856  000.055: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/opt/nvim-ts-autotag/plugin/nvim-ts-autotag.vim
187.000  010.083  002.925: sourcing /Users/carvalho28/.config/nvim/plugin/packer_compiled.lua
187.759  000.055  000.055: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/editorconfig.lua
187.903  000.071  000.071: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/man.lua
188.025  000.048  000.048: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/plugin/nvim.lua
188.072  004.491: loading rtp plugins
189.578  000.140  000.140: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/Comment.nvim/plugin/Comment.lua
190.115  000.133  000.133: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/lazygit.nvim/plugin/lazygit.vim
190.677  000.050  000.050: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/lspsaga.nvim/plugin/lspsaga.lua
191.035  000.029  000.029: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/LuaSnip/plugin/luasnip.vim
192.255  000.926  000.926: require('vim.filetype')
192.415  001.174  000.248: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/LuaSnip/plugin/luasnip.lua
194.940  000.192  000.192: require('cmp.utils.highlight')
195.180  000.525  000.333: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/nvim-cmp/plugin/cmp.lua
196.108  000.396  000.396: require('vim.version')
198.659  003.116  002.720: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/nvim-lspconfig/plugin/lspconfig.lua
199.208  000.048  000.048: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/nvim-treesitter/plugin/nvim-treesitter.lua
199.477  000.042  000.042: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/nvim-web-devicons/plugin/nvim-web-devicons.vim
199.904  000.031  000.031: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/plenary.nvim/plugin/plenary.vim
200.621  000.234  000.234: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/telescope.nvim/plugin/telescope.lua
201.253  000.320  000.320: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/vim-surround/plugin/surround.vim
201.638  000.056  000.056: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/vim-tmux-navigator/plugin/tmux_navigator.vim
201.900  007.931: loading packages
203.297  000.118  000.118: require('cmp_buffer.timer')
203.302  000.414  000.297: require('cmp_buffer.buffer')
203.305  000.593  000.179: require('cmp_buffer.source')
203.307  000.701  000.108: require('cmp_buffer')
203.332  000.756  000.055: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/cmp-buffer/after/plugin/cmp_buffer.lua
203.567  000.037  000.037: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/cmp-nvim-lsp/after/plugin/cmp_nvim_lsp.lua
204.051  000.274  000.274: require('cmp_path')
204.069  000.316  000.042: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/cmp-path/after/plugin/cmp_path.lua
204.543  000.239  000.239: require('cmp_luasnip')
204.626  000.359  000.120: sourcing /Users/carvalho28/.local/share/nvim/site/pack/packer/start/cmp_luasnip/after/plugin/cmp_luasnip.lua
204.662  001.294: loading after plugins
204.671  000.009: inits 3
206.924  002.253: reading ShaDa
207.476  000.289  000.289: require('luasnip.loaders.from_lua')
207.861  000.314  000.314: require('luasnip.loaders.from_snipmate')
208.284  000.330  000.330: require('luasnip.loaders.from_vscode')
208.373  000.516: opening buffers
208.532  000.159: BufEnter autocommands
208.535  000.003: editing files in windows
208.576  000.041: VimEnter autocommands
208.578  000.002: UIEnter autocommands
209.001  000.186  000.186: sourcing /usr/local/Cellar/neovim/0.9.0/share/nvim/runtime/autoload/provider/clipboard.vim
209.009  000.244: before starting main loop
209.210  000.201: first screen update
209.211  000.001: --- NVIM STARTED ---


times in msec
 clock   self+sourced   self:  sourced script
 clock   elapsed:              other lines

000.022  000.022: --- NVIM STARTING ---
000.146  000.124: event init
000.306  000.160: early init
000.842  000.536: locale set
000.912  000.070: init first window
001.400  000.488: inits 1
001.413  000.013: window checked
001.419  000.005: parsing arguments
001.970  000.086  000.086: require('vim.shared')
002.131  000.052  000.052: require('vim._meta')
002.133  000.160  000.108: require('vim._editor')
002.135  000.302  000.057: require('vim._init_packages')
002.139  000.418: init lua interpreter
003.344  001.205: expanding arguments
003.390  000.046: inits 2
003.725  000.335: init highlight
